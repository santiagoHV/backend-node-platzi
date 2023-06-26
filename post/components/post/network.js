const express = require('express')

const secure = require('./secure')
const response = require('../../../network/response')
const controller = require('./index')

const router = express.Router()

router.get('/', secure('list'), list)
router.get('/like', secure('list_own'), postLiked)
router.get('/:id', secure('get'), get)
router.post('/', secure('add'), upsert)
router.put('/', secure('update', { owner: 'user' }), upsert)
router.post('/:id/like', secure('add'), like);
router.get('/:id/like', secure('list'), postLikers);

async function list(req, res, next) {
    controller.list().then((list) => {
        response.success(req, res, list, 200)
    }).catch(next)
}

async function upsert(req, res, next) {
    controller.upsert(req.body, req.user)
        .then((user) => {
            response.success(req, res, user, 201)
        })
        .catch(next)
}

async function get(req, res, next) {
    controller.get(req.params.id)
        .then((user) => {
            response.success(req, res, user, 200)
        })
        .catch(next)
}

async function like(req, res, next) {
    controller.like(req.params.id, req.user)
        .then((data) => {
            response.success(req, res, data, 201)
        })
        .catch(next)
}

async function postLiked(req, res, next) {
    controller.postLiked(req.user)
        .then((posts) => {
            response.success(req, res, posts, 200)
        })
        .catch(next)
}

async function postLikers(req, res, next) {
    controller.postLikers(req.params.id)
        .then((users) => {
            response.success(req, res, users, 200)
        })
        .catch(next)
}


module.exports = router