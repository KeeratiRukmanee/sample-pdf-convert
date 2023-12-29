import 'reflect-metadata'
import Container from 'typedi'
import { LoggerService } from './services/LoggerService'
import { UserService } from './services/UserService'
import { ReqIdMiddleware } from './middlewares/reqidMiddleware'
import { LoggingMiddleware } from './middlewares/loggingMiddleware'
import { AuthMiddleware } from './middlewares/authMiddleware'
import { ErrorHandlerMiddleware } from './middlewares/errorMidddleware'
import { UserController } from './controllers/UserController'
import { PdfController } from './controllers/PdfController'
import { useContainer as routingUseContainer } from "routing-controllers"

//Register Service
Container.set(LoggerService, new LoggerService())
Container.set(UserService, new UserService())

//Register Middleware
Container.set(ReqIdMiddleware, new ReqIdMiddleware())
Container.set(LoggingMiddleware, new LoggingMiddleware(Container.get(LoggerService)))
Container.set(AuthMiddleware, new AuthMiddleware(Container.get(LoggerService)))
Container.set(ErrorHandlerMiddleware, new ErrorHandlerMiddleware(Container.get(LoggerService)))

//Register Controller
Container.set(UserController, new UserController(Container.get(UserService), Container.get(LoggerService)))
Container.set(PdfController, new PdfController(Container.get(LoggerService)))

// Enable `typedi` container for routing-controllers
routingUseContainer(Container)

export default Container
