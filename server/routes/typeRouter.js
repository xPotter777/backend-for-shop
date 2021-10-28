const Router = require('express')
const TypeController = require('../controllers/typeControllers')
const router = new Router()

router.post('/',TypeController.create)
router.get('/',TypeController.getAll)

module.exports = router