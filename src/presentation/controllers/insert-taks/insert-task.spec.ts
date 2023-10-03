import { TaskModel } from "../../../domain/models/task.model"
import { InsertTask, InsertTaskModel } from "../../../domain/usecases/insert-task.usecase"
import { InsertTaskController } from "./insert-taks.controller"

const makeInsertTaskStub = (): InsertTask => {
  class InsertTaskStub implements InsertTask {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async insert(task: InsertTaskModel): Promise<TaskModel> {
      return await Promise.resolve({
        id: 'valid_id',
        title: 'valid_title',
        description: 'valid_name',
        date: new Date(2020, 1, 10, 10, 0, 0, 0),
      })
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

    const response = await sut.handle({
      body: {
        title: 'any_title',
        description: 'any_description',
        date: new Date(2020, 1, 10)
      }
    })

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual(new Error('ServerError'))
  })
})