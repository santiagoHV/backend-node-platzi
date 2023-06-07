exports.success = function(req, res, message, status = 200) {
    res.status(status).send({
        error: false,
        status: status,
        body: message
    })
}

exports.error = function(req, res, message = 'Internal server error', status = 500) {
    res.status(status || 500).send({
        error: message,
        status: status || 500,
        body: ''
    })
}