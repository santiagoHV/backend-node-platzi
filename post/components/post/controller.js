const nanoid = require('nanoid');
const { error } = require('../../../network/response');

const TABLE_POST = 'post';
const TABLE_LIKE = TABLE_POST + '_like'

module.exports = function(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }

    const list = () => {
        return store.list(TABLE_POST);
    }

    const get = (id) => {
        const post = store.get(TABLE_POST, id)
        if (!user) {
            throw error("Post doesn't exist", 404)

        }
        return post
    }


    const upsert = async(data, user) => {
        let isNew = false

        const post = {
            user: user.id,
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

    const like = async(post, user) => {
        const like = await store.upsert(TABLE_LIKE, {
            post: post,
            user: user
        })
        return like
    }

    const postLiked = async(user) => {
        const posts = await store.query(TABLE_LIKE, { user, user }, { post: 'post' })
        return posts
    }

    const postLikers = async(post) => {
        const users = await store.query(TABLE_LIKE, { post: post }, { user: 'user' })
        return users
    }

    return {
        list,
        upsert,
        get,
        like,
        postLiked,
        postLikers
    }
}