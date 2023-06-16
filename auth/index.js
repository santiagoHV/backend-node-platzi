const jwt = require('jsonwebtoken')

const sign = (data) => {
    return jwt.sign(data, 'process.env.JWT_SECRET')
}

module.exports = {
    sign,
}