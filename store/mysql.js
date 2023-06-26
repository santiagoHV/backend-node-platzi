// const mysql = require("mysql")
const mysql = require('mysql2')

const config = require('../config')

const dbconf = {
    host: config.mysql.host,
    user: config.mysql.user,
    port: 3306,
    password: config.mysql.password,
    database: config.mysql.database
}

let connection

const handleCon = () => {
    connection = mysql.createConnection(dbconf)

    connection.connect(err => {
        if (err) {
            console.error("[db err]", err)
            setTimeout(handleCon, 2000)
        } else {
            console.log('DB Connected!')
        }
    })

    connection.on('error', err => {
        console.error("[db err]", err)

        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            handleCon()
        } else {
            throw err
        }
    })
}

handleCon()

const list = (table) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table}`, (err, data) => {
            if (err) return reject(err)

            resolve(data)
        })
    })
}


const get = (table, id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} WHERE id=${id}`, (err, data) => {
            if (err) return reject(err)

            resolve(data)
        })
    })
}

const insert = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`INSERT INTO ${table} SET ?`, data, (err, result) => {
            if (err) return reject(err)

            resolve(result)
        })
    })
}

const update = (table, data) => {
    return new Promise((resolve, reject) => {
        connection.query(`UPDATE ${table} SET ? WHERE id=?`, [data, data.id], (err, result) => {
            if (err) return reject(err)

            resolve(result)
        })
    })
}

const upsert = (table, data, isNew) => {
    if (data && isNew) {
        return insert(table, data)
    } else {
        return update(table, data)
    }
}

const query = (table, query, join) => {
    let joinQuery = ''
    if (join) {
        const key = Object.keys(join)[0]
        const val = join[key]
        joinQuery = `JOIN ${key} ON ${table}.${val} = ${key}.id`
    }

    console.log(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query)
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM ${table} ${joinQuery} WHERE ${table}.?`, query, (err, res) => {
            if (err) return reject(err)

            resolve(res || null)
        })
    })
}



module.exports = {
    list,
    get,
    upsert,
    query
}