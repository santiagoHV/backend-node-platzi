const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', list)
router.post('/', upsert)

async function list(req, res, next) {
    controller.list().then((list) => {
        response.success(req, res, list, 200)
    }).catch(next)
}

async function upsert(req, res, next) {
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201)
        })
        .catch(next)
}

module.exports = router