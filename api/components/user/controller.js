const nanoid = require('nanoid');

const auth = require('../auth');

const TABLE_USER = 'user';
const TABLE_FOLLOW = 'follow';

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    const list = () => {
        return store.list(TABLE_USER);
    }

    const get = (id) => {
        return store.get(TABLE_USER, id);
    }


    const upsert = async(body) => {
        const user = {
            name: body.name,
            username: body.username,
        }

        let isNew = false

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid()
            isNew = true
        }

        if (body.password || body.username) {
            await auth.upsert({
                id: user.id,
                username: user.username,
                password: body.password,
            }, isNew)
        }


        return store.upsert(TABLE_USER, user, isNew)
    }

    const follow = (from, to) => {
        return store.upsert(TABLE_FOLLOW, {
            user_from: from,
            user_to: to,
        }, true)
    }

    const getFollowers = (userId) => {
        const join = {}
        join[TABLE_USER] = 'user_from'
        const query = { user_to: userId }

        console.log(query, join)

        return store.query(TABLE_FOLLOW, query, join)
    }

    const getFollowing = (userId) => {
        const join = {}
        join[TABLE_USER] = 'user_to'
        const query = { user_from: userId }

        return store.query(TABLE_FOLLOW, query, join)
    }

    // const remove = (id) => {
    //     return store.remove(TABLE, id);
    // }

    return {
        list,
        get,
        upsert,
        follow,
        getFollowers,
        getFollowing
    }
}