const ApiError = require("../error/ApiError");

class UserControllers {

    async registration(req, res) {

    }

    async login(req, res) {

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