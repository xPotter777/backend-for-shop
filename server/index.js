require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')
const path = require('path')
const sequelize = require('./db')
const models = require('./models/models')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHadlingMiddleware')

const PORT = process.env.PORT || 3001
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname,'static')))
app.use(fileUpload({}))
app.use('/api',router)
//error handlers must be the last middleware
app.use(errorHandler)

app.get('/',(req,res) => {
    res.status(200).json({message: 'working'})
})

const startDb = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,() => {
            console.log(`Server started on PORT ${PORT}`)
        })
    } catch (e) {
        console.log(e)
    }
}

startDb()
