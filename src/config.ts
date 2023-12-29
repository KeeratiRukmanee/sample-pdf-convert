import 'dotenv/config'

export default {
    server: {
        port: process.env.APP_PORT || 3000,
        isDev: ((process.env.NODE_ENV || 'development') === 'development') ? true : false,
        mode: process.env.NODE_ENV || 'development'
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    },
    swagger: {
        url: process.env.SWAGGER_URL || '/api-docs'
    }
}

