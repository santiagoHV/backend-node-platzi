const jwt = require('jsonwebtoken')
const config = require('../config')
const error = require('../utils/error')

const secret = config.jwt.secret

const sign = (data) => {
    return jwt.sign(data, secret)
}

const check = {
    own: (req, owner) => {
        const decoded = decodeHeader(req)

        console.log(decoded)

        if (decoded.id !== owner) {
            throw error('Unauthorized', 401)
        }
    }
}

const decodeHeader = (req) => {
    const authorization = req.headers.authorization || ''
    const token = getToken(authorization)
    const decoded = verify(token)

    req.user = decoded
    return decoded
}

const getToken = (authorization) => {
    if (!authorization) {
        throw error('No token')
    }

    if (authorization.indexOf('Bearer ') == -1) {
        throw error('Invalid format')
    }

    return authorization.replace('Bearer ', '')
}

const verify = (token) => {
    return jwt.verify(token, secret)
}

module.exports = {
    sign,
    check
}