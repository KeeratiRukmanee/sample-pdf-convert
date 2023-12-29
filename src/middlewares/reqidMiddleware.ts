import { Request, Response, NextFunction } from "express"
import { Service } from "typedi"
import { Middleware } from "routing-controllers"
import { v4 as uuidv4 } from 'uuid'

@Service()
@Middleware({ type: 'before', priority: 3 })
export class ReqIdMiddleware {

    use(req: Request, res: Response, next: NextFunction) {

        req.headers["request-id"] = uuidv4()

        next()
    }
}