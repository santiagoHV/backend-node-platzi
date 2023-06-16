const auth = require('../../../auth')

const TABLE = 'auth';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    const login = async(username, password) => {
        const data = await store.query(TABLE, { username: username });
        if (data.password === password) {
            return auth.sign(data);
        } else {
            throw new Error('Invalid information');
        }

        return data
    }

    const upsert = (data) => {
        const authData = {
            id: data.id,
        }

        if (data.username) {
            authData.username = data.username;
        }

        if (data.password) {
            authData.password = data.password;
        }

        return store.upsert(TABLE, authData)
    }

    return {
        upsert,
        login,
    }
}