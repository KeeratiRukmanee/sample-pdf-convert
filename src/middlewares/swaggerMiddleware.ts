import express from 'express'
import swaggerUi from 'swagger-ui-express'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import { getMetadataArgsStorage } from 'routing-controllers'
import config from '../configs'

export function swaggerHandler() {

    const routePrefix = config.routePath.routePrefix

    const spec = routingControllersToSpec(getMetadataArgsStorage(),
        {
            routePrefix: routePrefix,
        },
        {
            components: {
                securitySchemes: {
                    ApiKeyAuth: {
                        type: 'apiKey',
                        in: 'header',
                        name: config.swagger.headerKey
                    }
                }
            },
            info: {
                title: 'Sample PDF Convert API',
                version: '0.0.1'
            }
        })

    const url = config.swagger.url
    const router = express.Router()

    router.use(url, swaggerUi.serve)
    router.get(url, swaggerUi.setup(spec))

    return router
}