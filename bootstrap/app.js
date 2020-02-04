const express = require('express')
const path = require('path')
const env = require('./env')

const app = express()

app.use(express.static(path.join(__dirname, '..', env.PUBLIC_DIR)))
app.use(`/${env.FILE_DIR}`, express.static(path.join(__dirname, '..', env.FILE_DIR)))
app.use(express.urlencoded({extended: true}))

module.exports = app