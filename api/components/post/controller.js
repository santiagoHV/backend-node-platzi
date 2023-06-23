const nanoid = require('nanoid');

const TABLE_POST = 'post';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    const list = () => {
        return store.list(TABLE_POST);
    }

    const get = (id) => {
        return store.get(TABLE_POST, id);
    }


    const upsert = async(data) => {
        let isNew = false

        const post = {
            user: data.user,
            text: data.text,
        }

        if (data.id) {
            post.id = data.id
        } else {
            post.id = nanoid()
            isNew = true
        }


        return store.upsert(TABLE_POST, post, isNew)
    }

    return {
        list,
        upsert,
        get
    }
}