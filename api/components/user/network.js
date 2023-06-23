const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', list)
router.post('/follow/:id', secure('logged'), follow)
router.get('/my-followers/', secure('logged'), getMyFollowers)
router.get('/following/', secure('logged'), getFollowing)
router.get('/:id', get)
router.post('/', upsert)
router.put('/', secure('update'), upsert)



async function list(req, res, next) {
    controller.list().then((list) => {
        response.success(req, res, list, 200)
    }).catch(next)
}

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     description: Retorna un usuario basado en su ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del usuario
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: Usuario no encontrado
 */
async function get(req, res, next) {
    controller.get(req.params.id).then((user) => {
        response.success(req, res, user, 200)
    }).catch(next)
}

async function upsert(req, res, next) {
    controller.upsert(req.body)
        .then((user) => {
            response.success(req, res, user, 201)
        })
        .catch(next)
}

async function follow(req, res, next) {
    controller.follow(req.user.id, req.params.id)
        .then((data) => {
            response.success(req, res, data, 201)
        })
        .catch(next)
}

async function getMyFollowers(req, res, next) {
    controller.getFollowers(req.user.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(next)
}

async function getFollowing(req, res, next) {
    controller.getFollowing(req.user.id)
        .then((data) => {
            response.success(req, res, data, 200)
        })
        .catch(next)
}


// router.delete('/', async(req, res) => {
//     controller.remove(req.params.id).then((message) => {
//         response.success(req, res, message, 200)
//     }).catch((err) => {
//         response.error(req, res, err.message, 500)
//     })
// })

module.exports = router