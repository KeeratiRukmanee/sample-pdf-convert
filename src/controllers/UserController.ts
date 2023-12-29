import { Request } from "express"
import { UserService } from "../services/UserService"
import { LoggerService } from "../services/LoggerService"
import { UserDTO } from "../dtos/UserDTO"
import { ResponseDTO } from "../dtos/ResponseDTO"
import { Inject, Service } from "typedi"
import { Body, Get, Post, JsonController, Req, HttpCode, Param } from "routing-controllers"
import { OpenAPI } from 'routing-controllers-openapi'

@Service()
@OpenAPI({
  security: [{ ApiKeyAuth: [] }]
})
@JsonController('/users')
export class UserController {

  @Inject() // เพื่อบอกว่า userService เป็น Dependency Injection
  private userService: UserService

  @Inject()
  private loggerService: LoggerService

  constructor(userService: UserService, loggerService: LoggerService) {
    this.userService = userService
    this.loggerService = loggerService
  }

  @HttpCode(201)
  @Post('/')
  createUser(@Req() req: Request, @Body() user: UserDTO): ResponseDTO {

    const newUser = this.userService.createUser(user)

    const res: ResponseDTO = {
      requestId: req.headers["request-id"],
      success: true,
      message: "create user success",
      data: newUser
    }

    this.loggerService.info("createUser")

    return res
  }

  @HttpCode(200)
  @Get('/')
  getUsers(@Req() req: Request): ResponseDTO {

    const users: UserDTO[] = this.userService.getUsers()

    const res: ResponseDTO = {
      requestId: req.headers["request-id"],
      success: true,
      message: "get all users success",
      data: users
    }

    this.loggerService.info("getUsers")

    return res
  }

  @HttpCode(200)
  @Get('/:id')
  getUsersByID(@Req() req: Request, @Param('id') id: string): ResponseDTO {

    const users: UserDTO[] = this.userService.getUserByID(id)

    const res: ResponseDTO = {
      requestId: req.headers["request-id"],
      success: true,
      message: "get user success",
      data: users[0]
    }

    this.loggerService.info(`get user ${users[0].id}`)

    return res
  }
}