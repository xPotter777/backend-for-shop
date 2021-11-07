const Router = require('express')
const BrandController = require('../controllers/brandControllers')
const router = new Router()
const checkRole = require('../middleware/checkRoleMiddleware')

router.post('/',checkRole('ADMIN'),BrandController.create)
router.get('/',BrandController.getAll)

module.exports = router