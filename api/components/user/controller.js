const nanoid = require('nanoid');

const auth = require('../auth');

const TABLE_USER = 'user';
const TABLE_FOLLOW = 'follow';

module.exports = function(injectedStore, injectedCache) {
    let store = injectedStore
    let cache = injectedCache

    if (!store) {
        store = require('../../../store/dummy');
    }

    if (!cache) {
        cache = require('../../../store/dummy')
            //usar base de datos real
    }

    const list = async() => {
        let users = await cache.list(TABLE_USER)

        if (!users) {
            console.log('No cached data')
            users = await store.list(TABLE_USER)
            cache.upsert(TABLE_USER, users)
        } else {
            console.log('Cached data')
        }

        return users
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