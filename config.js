module.exports = {
    api: {
        port: process.env.API_PORT || 3000
    },
    jwt: {
        secret: process.env.JWT_SECRET || 'S3CR3T'
    },
    mysql: {
        host: process.env.MYSQL_HOST || '',
        user: process.env.MYSQL_USER || '',
        password: process.env.MYSQL_PASSWORD || '',
        database: process.env.MYSQL_DATABASE || '',
    },
    mysqlService: {
        port: process.env.MYSQL_SRV_PORT || 3001,
        host: process.env.MYSQL_SRV_HOST || 'localhost',
    },
    post: {
        port: process.env.POST_SRV_PORT || 3002,
    },
    cacheService: {
        port: process.env.CACHE_SRV_PORT || 3003,
        host: process.env.CACHE_SRV_HOST || 'localhost',
    },
    redis: {
        host: process.env.REDIS_HOST || '',
        port: process.env.REDIS_PORT || '',
    },
    remoteDB: process.env.REMOTE_DB || false,
}