const Router = require('express')
const BrandController = require('../controllers/brandControllers')
const router = new Router()

router.post('/',BrandController.create)
router.get('/',BrandController.getAll)

module.exports = router