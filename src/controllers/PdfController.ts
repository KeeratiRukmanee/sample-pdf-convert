import { Request } from "express"
import { UserService } from "../services/UserService"
import { LoggerService } from "../services/LoggerService"
import { UserDTO } from "../dtos/UserDTO"
import { ResponseDTO } from "../dtos/ResponseDTO"
import { Inject, Service } from "typedi"
import { Body, Get, Post, JsonController, Req, HttpCode, Param, UploadedFile } from "routing-controllers"
import { OpenAPI } from 'routing-controllers-openapi'
import filesystem from 'fs';
import { Poppler } from 'node-poppler'
import path from "path"

@Service()
@OpenAPI({
  security: [{ ApiKeyAuth: [] }]
})
@JsonController('/pdf')
export class PdfController {

  @Inject()
  private loggerService: LoggerService

  constructor(loggerService: LoggerService) {
    this.loggerService = loggerService
  }

  @HttpCode(201)
  @Post('/upload')
  async upload(@UploadedFile('file') file: any, @Req() req: Request) {

    const newDir: string = `${__dirname}/../../storage/${req.headers["request-id"]}`
    const filePath = path.join(newDir, file.originalname)

    filesystem.mkdirSync(newDir);
    filesystem.writeFile(filePath, file.buffer, (error) => {
      if (error) {
        throw new Error(`${error}`)
      }
    })

    let poppler
    if (process.platform === "win32") {
      //windows
      poppler = new Poppler()
    } else {
      //linux
      poppler = new Poppler("/usr/bin")
    }

    let fileInfo: any
    await poppler.pdfInfo(filePath, {
      printAsJson: true
    }).then((res) => {
      fileInfo = res
    })

    const outputFile = `${newDir}/${path.basename(filePath, path.extname(filePath))}`
    await poppler.pdfToCairo(filePath, outputFile, {
      firstPageToConvert: 1,
      scalePageTo: 1920,
      jpegFile: true,
    })

    let allFiles = []
    for (let index = 1; index <= Number(fileInfo.pages); index++) {

      let str = '' + index
      while (str.length < fileInfo.pages.length) {
        str = '0' + str;
      }

      allFiles.push(`/static/${req.headers["request-id"]}/${path.basename(filePath, path.extname(filePath))}-${str}.jpg`);

    }

    const res: ResponseDTO = {
      requestId: req.headers["request-id"],
      success: true,
      message: "upload and convert to image success",
      data: {
        allOfPages: Number(fileInfo.pages),
        fullfile: allFiles,
      }
    }

    return res;
  }

  @HttpCode(200)
  @Get('/')
  getUsers(@Req() req: Request): ResponseDTO {


    console.log(process.platform)

    const res: ResponseDTO = {
      requestId: req.headers["request-id"],
      success: true,
      message: "get image success",
      data: ""
    }

    // this.loggerService.info("getUsers")

    return res
  }

}