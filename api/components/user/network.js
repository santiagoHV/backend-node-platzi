const express = require('express')

const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', list)
router.get('/:id', get)
router.post('/', upsert)

async function list(req, res) {
    controller.list().then((list) => {
        response.success(req, res, list, 200)
    }).catch((err) => {
        response.error(req, res, err.message, 500)
    })
}

async function get(req, res) {
    controller.get(req.params.id).then((user) => {
        response.success(req, res, user, 200)
    }).catch((err) => {
        response.error(req, res, err.message, 500)
    })
}

async function upsert(req, res) {
    controller.upsert(req.body).then((user) => {
        response.success(req, res, user, 200)
    }).catch((err) => {
        response.error(req, res, err.message, 500)
    })
}




// router.delete('/', async(req, res) => {
//     controller.remove(req.params.id).then((message) => {
//         response.success(req, res, message, 200)
//     }).catch((err) => {
//         response.error(req, res, err.message, 500)
//     })
// })

module.exports = router