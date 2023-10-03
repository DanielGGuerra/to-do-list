import { Request, Response } from "../protocols/http.interface"

export class InsertTaskController {
  handle(request: Request): Response {
    const columns = ['description', 'title']

    for(const column of columns) {
      if(!request.body[column]) {
        return {
          statusCode: 400,
          body: new Error(`MissingParamError: ${column}`)
        }
      }
    }
    return {
      statusCode: 200,
      body: undefined
    }
  }
}