const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()

const config = require('../config')
const post = require('./components/post/network')
const errors = require('../network/errors')

const app = express()

app.use(bodyParser.json())

//ROUTES
app.use('/post', post)

app.use(errors)

app.listen(config.post.port, () => console.log('Posts service running'))