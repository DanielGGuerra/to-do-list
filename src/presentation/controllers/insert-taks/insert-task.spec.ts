import { TaskModel } from "../../../domain/models/task.model"
import { InsertTask, InsertTaskModel } from "../../../domain/usecases/insert-task.usecase"
import { created, serverError } from "../helpers/http.helper"
import { Request } from "../protocols/http.interface"
import { InsertTaskController } from "./insert-taks.controller"

const makeFakeTask = (): TaskModel => ({
  id: 'valid_id',
  title: 'valid_title',
  description: 'valid_description',
  date: new Date(2020, 1, 10, 10, 0, 0, 0),
})

const makeFakeRequest = (): Request => ({
  body: {
    title: 'valid_title',
    description: 'valid_description',
    date: new Date(2020, 1, 10)
  }
})

const makeInsertTaskStub = (): InsertTask => {
  class InsertTaskStub implements InsertTask {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async insert(task: InsertTaskModel): Promise<TaskModel> {
      return await Promise.resolve(makeFakeTask())
    }
  }
  return new InsertTaskStub()
}

interface TypesSut {
  sut: InsertTaskController
  insertTaskStub: InsertTask
}

const makeSut = (): TypesSut => {
  const insertTaskStub = makeInsertTaskStub()
  const sut = new InsertTaskController(insertTaskStub)
  return {
    sut,
    insertTaskStub
  }
}

describe('InsertTaskController', () => {
  test('should return 400 if no description is provided', async () => {
    const {sut} = makeSut()
    const request = {
      body: {
        title: 'any_title',
      }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('MissingParamError: description'))
  })
  test('should return 400 if no title is provided', async () => {
    const {sut} = makeSut()
    const request = {
      body: {
        description: 'any_description',
      }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('MissingParamError: title'))
  })
  test('should return 400 if no date is provided', async () => {
    const {sut} = makeSut()
    const request = {
      body: {
        title: 'any_title',
        description: 'any_description',
      }
    }
    const response = await sut.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('MissingParamError: date'))
  })
  test('should return 500 if InsertTask return throws', async () => {
    const {sut, insertTaskStub} = makeSut()

    jest.spyOn(insertTaskStub, 'insert').mockRejectedValueOnce(new Error())

    const response = await sut.handle(makeFakeRequest())
    
    expect(response).toEqual(serverError(new Error('ServerError')))
  })
  test('should call InsertTask with correct values', async () => {
    const {sut, insertTaskStub} = makeSut()
    const insertSpy = jest.spyOn(insertTaskStub, 'insert')
    await sut.handle(makeFakeRequest())
    expect(insertSpy).toHaveBeenCalledWith(makeFakeRequest().body)
  })
  test('should return 201 if valid data is provid', async () => {
    const {sut} = makeSut()
    const response = await sut.handle(makeFakeRequest())
    expect(response).toEqual(created(makeFakeTask()))
  })
})