import { CustomHttpError } from "./customerror"

// class NotFoundError extends CustomError {
//     constructor(resource: string) {
//         super(`${resource} not found`)
//     }
// }

class NotFoundError extends CustomHttpError {
    constructor(resource: string) {
        super(404, `${resource} not found`)
    }
}

export default NotFoundError