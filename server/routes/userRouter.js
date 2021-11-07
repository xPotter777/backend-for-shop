const Router = require('express')
const userController = require('../controllers/userControllers')
const authMiddleware = require('../middleware/authMiddleware')
const router = new Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth',authMiddleware,userController.isAuth)

module.exports = router