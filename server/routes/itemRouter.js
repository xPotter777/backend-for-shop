const Router = require('express')
const ItemController = require('../controllers/itemControllers')
const checkRole = require('../middleware/checkRoleMiddleware')
const router = new Router()

router.post('/',checkRole('ADMIN'),ItemController.create)
router.get('/',ItemController.getAll)
router.get('/:id',ItemController.getOne)

module.exports = router