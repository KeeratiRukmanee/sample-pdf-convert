import { HttpError } from "routing-controllers"

export class CustomError extends Error {
    constructor(message: string) {
        super(message)
        this.name = this.constructor.name
        Error.captureStackTrace(this, this.constructor)
    }
}

export class CustomHttpError extends HttpError {

    constructor(statuCode: number, message: string) {
        super(statuCode, message)
        this.name = this.constructor.name
        // Error.captureStackTrace(this, this.constructor)
        // HttpError.captureStackTrace(this, this.constructor)
    }
}