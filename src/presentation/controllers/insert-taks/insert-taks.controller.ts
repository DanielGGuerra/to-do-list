import { Request, Response } from "../protocols/http.interface"

export class InsertTaskController {
  handle(request: Request): Response {
    if(!request.body.description) {
      return {
        statusCode: 400,
        body: new Error('MissingParamError: description')
      }
    }
    if(!request.body.title) {
      return {
        statusCode: 400,
        body: new Error('MissingParamError: title')
      }
    }
    return {
      statusCode: 200,
      body: undefined
    }
  }
}