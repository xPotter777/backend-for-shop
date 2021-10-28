const Router = require('express')
const userController = require('../controllers/userControllers')

const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',userController.isAuth)

module.exports = router