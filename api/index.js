const express = require('express')
const bodyParser = require('body-parser')

//TODO: add automatic documentation
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require("../swaggerConfig");

const config = require('../config')
const user = require('./components/user/network')
const auth = require('./components/auth/network')

const app = express()

app.use(bodyParser.json())

//ROUTES
app.use('/api/user', user)
app.use('/api/auth', auth)
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(config.api.port, () => console.log('Server up and running'))