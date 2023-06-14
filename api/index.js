const express = require('express')
const bodyParser = require('body-parser')

//TODO: add automatic documentation
const swaggerUi = require('swagger-ui-express')

const config = require('../config')
const user = require('./components/user/network')

const app = express()

app.use(bodyParser.json())

//ROUTES
app.use('/api/user', user)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(config.swagger))

app.listen(config.api.port, () => console.log('Server up and running'))