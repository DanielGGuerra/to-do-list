import { badRequest, created } from "../helpers/http.helper"
import { Request, Response } from "../protocols/http.interface"

export class InsertTaskController {
  handle(request: Request): Response {
    const columns = ['description', 'title']

    for(const column of columns) {
      if(!request.body[column]) {
        return badRequest(new Error(`MissingParamError: ${column}`))
      }
    }
    return created('')
  }
}