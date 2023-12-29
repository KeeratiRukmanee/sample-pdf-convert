import { NextFunction, Request, Response } from "express"
import { Inject, Service } from "typedi"
import { LoggerService } from "../services/LoggerService"
import { HttpError, Middleware } from "routing-controllers"
import NotFoundError from "../errors/notfounderror"

@Service()
@Middleware({ type: 'after' }) // 'after' type means this middleware runs after the route handler
export class ErrorHandlerMiddleware {

    @Inject()
    private logger: LoggerService

    constructor(logger: LoggerService) {
        this.logger = logger
    }

    error(error: HttpError, req: Request, res: Response, next: NextFunction) {

        const { method, url, params, query, body } = req

        // Log error
        this.logger.error(error.message, {
            method,
            url,
            params,
            query,
            body
        })

        if (error instanceof NotFoundError) {
            res.status(400).json({
                message: error.message,
                success: false,
                status: error.httpCode
            })
        }

        next()
    }
}
