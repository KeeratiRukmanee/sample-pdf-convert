import { Request, Response, NextFunction } from "express"
import { Inject, Service } from "typedi"
import { Middleware } from "routing-controllers"
import { LoggerService } from "../services/LoggerService"

@Service()
@Middleware({ type: 'before', priority: 2 })
export class AuthMiddleware {

    @Inject()
    private loggerService: LoggerService

    constructor(logger: LoggerService) {
        this.loggerService = logger
    }

    use(req: Request, res: Response, next: NextFunction) {

        // fix apikey to "test"
        if (req.headers["x-api-key"] == "test-api-key") {
            next()
        } else {
            this.loggerService.warn("Unauthorized")
            res.status(401).json({ message: 'Unauthorized' })
        }
    }
}