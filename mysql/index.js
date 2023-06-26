const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config()

const config = require('../config');
const router = require('./network');


const app = express();

app.use(bodyParser.json());

// ROUTES
app.use('/', router)

app.listen(config.mysqlService.port, () => {
    console.log('MySQL service running on port', config.mysqlService.port);
})