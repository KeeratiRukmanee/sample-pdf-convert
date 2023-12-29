import dotenv from "dotenv"
import { ServerConfig } from "./serverConfig"
import { LoggingConfig } from "./loggingConfig"
import { SwaggerConfig } from "./swaggerConfig"
import { RoutePathConfig } from "./routePathConfig"
dotenv.config()

interface AppConfig {
    server: ServerConfig
    logging: LoggingConfig
    swagger: SwaggerConfig
    routePath: RoutePathConfig
}

const config: AppConfig = {
    server: {
        port: parseInt(process.env.PORT || '3000'),
        isDev: ((process.env.NODE_ENV || '') === 'development') ? true : false,
        mode: process.env.NODE_ENV || ''
    },
    logging: {
        level: process.env.LOG_LEVEL || 'info',
    },
    swagger: {
        url: process.env.SWAGGER_URL || '/api-docs',
        headerKey: process.env.SWAGGER_AUTH_HEADER_KEY || 'x-api-key'
    },
    routePath: {
        routePrefix: process.env.ROUTE_PATH_PREFIX || '/api/v1'
    }
}

export default config
