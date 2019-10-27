var express = require('express')
var config = require('../config')
var swaggerDoc = require('./swaggerDoc')

var app = express()

app.use(express.static("client/build"))
swaggerDoc(app)


const PORT = config.port

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})