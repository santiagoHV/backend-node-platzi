const express = require('express');
const bodyParser = require('body-parser');

require('dotenv').config()

const config = require('../config');
const router = require('./network');


const app = express();

app.use(bodyParser.json());

// ROUTES
app.use('/', router)

app.listen(config.cacheService.port, () => {
    console.log('Cache Redis service running on port', config.cacheService.port);
})