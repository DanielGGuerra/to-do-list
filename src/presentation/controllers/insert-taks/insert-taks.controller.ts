import { InsertTask } from "../../../domain/usecases/insert-task.usecase"
import { badRequest, created } from "../helpers/http.helper"
import { Request, Response } from "../protocols/http.interface"

export class InsertTaskController {
  constructor(
    private readonly insertTask: InsertTask
  ) { }
  async handle(request: Request): Promise<Response> {
    try {
      const columns = ['description', 'title', 'date']
  
      for(const column of columns) {
        if(!request.body[column]) {
          return badRequest(new Error(`MissingParamError: ${column}`))
        }
      }
  
      await this.insertTask.insert({
        title: request.body.title,
        description: request.body.description,
        date: request.body.date
      })
  
      return created('')
    } catch {
      return {
        statusCode: 500,
        body: new Error('ServerError')
      }
    }
  }
}