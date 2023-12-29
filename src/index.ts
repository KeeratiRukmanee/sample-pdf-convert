import 'dotenv/config'
import express from 'express'
import { useExpressServer } from "routing-controllers"
import './container' // Import your container configuration Import Only
import { swaggerHandler } from './middlewares/swaggerMiddleware'
import config from './configs'

// Define env variables
const port = config.server.port
const isDev = config.server.isDev
const mode = config.server.mode
const routePrefix = config.routePath.routePrefix

const app = express()

// Middleware
app.use(express.json()) // แปลง Json String ให้เป็น Json object

app.use('/static', express.static('storage'));

// Set up routing-controllers with typedi container
const routingControllersOptions = {
    controllers: [__dirname + '/controllers/*.ts'],
    routePrefix: routePrefix,
}
useExpressServer(app, routingControllersOptions)

if (isDev) {
    app.use(swaggerHandler())
}

// Start server
app.listen(port, () => {
    console.log(`Starting in ${mode} mode http://localhost:${port}`)
    console.log(`Listen at port ${port}`)
})