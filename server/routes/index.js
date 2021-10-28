const Router = require('express')
const itemRouter = require('./itemRouter')
const brandRouter = require('./brandRouter')
const typeRouter = require('./typeRouter')
const userRouter = require('./userRouter')


const router = new Router()

router.use('/user',userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', itemRouter)

module.exports = router