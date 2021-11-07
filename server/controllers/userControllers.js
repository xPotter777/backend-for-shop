const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {User,Basket} = require('../models/models')

const generateJwt = (email, role, id) => {
    return jwt.sign(
        {id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserControllers {

    async registration(req, res, next) {
        const {email, password, role} = req.body
        if(!email || !password) {
            return next(ApiError.badRequest('User credentials are incorrect'))
        }
        const candidate = await User.findOne({where:{email}})
        if (candidate) {
            return next(ApiError.badRequest('User with this email already exists'))
        }
        const hashPassword = await bcrypt.hash(password,5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId:user.id})
        const token = generateJwt(user.email, user.role, user.id)
        return res.json({token})
    }

    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where:{email}})
        if(!user){
            return next(ApiError.internal('Wrong email or password'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword) {
            return next(ApiError.internal('Wrong email or password'))
        }
        const token = generateJwt(user.email,user.role, user.id)
        return res.json({token})

    }

    async isAuth(req, res, next) {
    const {id} = req.query
        if(!id) {
            return next(ApiError.badRequest('No id given'))
        }
        res.json({message:req.query})
    }
}

module.exports = new UserControllers()