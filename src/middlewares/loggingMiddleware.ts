import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { LoggerService } from "../services/LoggerService"
import { Middleware } from "routing-controllers"

@Service()
@Middleware({ type: 'before', priority: 1 })
export class LoggingMiddleware {

    @Inject()
    private loggerService: LoggerService

    constructor(logger: LoggerService) {
        this.loggerService = logger
    }

    use(req: Request, res: Response, next: NextFunction) {

        const { method, url, params, query, body, headers } = req
        // Log request information
        this.loggerService.info("Request incoming", {
            method,
            url,
            params,
            query,
            body,
            headers,
            timestamp: new Date().toISOString(),
        })

        next()
    }
}
