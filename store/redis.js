const redis = require('redis')

const config = require('../config')

const host = config.redis.host
const port = config.redis.port

const client = redis.createClient(port, host);

(async() => {
    await client.connect();
    console.log('Conectado a REDIS');
})()

const list = async(table) => {
    const data = await client.get(table)

    if (data) {
        return JSON.parse(data)
    }

    return null
}

const get = (table, id) => {}

const upsert = async(table, data) => {
    let key = table

    if (data && data.id) {
        key = key + '_' + data.id
    }

    client.setEx(key, 10, JSON.stringify(data))

    return true
}

const remove = (table, id) => {}

module.exports = {
    list,
    get,
    upsert,
    remove,
}