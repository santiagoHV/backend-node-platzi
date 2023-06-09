const bcrypt = require('bcrypt')

const auth = require('../../../auth')

const TABLE = 'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    const login = async(username, password) => {
        let data = await store.query(TABLE, { username: username })
        data = data[0]

        return bcrypt.compare(password, data.password)
            .then(areEqual => {
                if (areEqual === true) {
                    return auth.sign(data);
                } else {
                    throw new Error('Invalid information');
                }
            })
    }

    const upsert = async(data, isNew) => {
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = await bcrypt.hash(data.password, 5);
        }

        return store.upsert(TABLE, authData, isNew)
    }

    return {
        upsert,
        login,
    }
}