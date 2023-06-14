const nanoid = require('nanoid');

const TABLE = 'user';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    const list = () => {
        return store.list(TABLE);
    }

    const get = (id) => {
        return store.get(TABLE, id);
    }

    const upsert = (body) => {
        const user = {
            name: body.name,
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        return store.upsert(TABLE, user)
    }

    // const remove = (id) => {
    //     return store.remove(TABLE, id);
    // }

    return {
        list,
        get,
        upsert,
    }
}