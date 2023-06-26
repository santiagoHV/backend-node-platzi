const request = require('request')

function createRemoteDB(host, port) {
    const URL = `http://${host}:${port}`

    const list = async(table) => {
        return await req('GET', table)
    }

    const get = async(table, id) => {
        return await req('GET', table, id)
    }

    const insert = async(table, data) => {
        return await req('POST', table, data)
    }

    const update = async(table, data) => {
        return await req('PUT', table, data)
    }

    const upsert = async(table, data, isNew) => {
        if (isNew) {
            return await insert(table, data)
        } else {
            return await update(table, data)
        }
    }

    const query = async(table, query, join) => {
        const res = await req('POST', table + '/query', { query, join })
        return res
    }

    const req = async(method, table, data) => {
        let url = `${URL}/${table}`
        let body = ''

        if (method === 'GET' && data) {
            url += `/${data}`
        } else if (data) {
            body = JSON.stringify(data)
        }

        return new Promise((resolve, reject) => {
            request({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body
            }, (err, req, body) => {
                if (err) {
                    console.error('Error in remote DB')
                    return reject(err.message)
                }

                const resp = JSON.parse(body)
                return resolve(resp.body)
            })
        })
    }

    return {
        list,
        get,
        upsert,
        query
    }
}

module.exports = createRemoteDB