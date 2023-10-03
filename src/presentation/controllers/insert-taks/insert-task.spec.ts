import { InsertTaskController } from "./insert-taks.controller"

const makeSut = (): InsertTaskController => {
  return new InsertTaskController()
}

describe('InsertTaskController', () => {
  test('should return 400 if no description is provided', () => {
    const sut = makeSut()
    const request = {
      body: {
        title: 'any_title',
      }
    }
    const response = sut.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('MissingParamError: description'))
  })
  test('should return 400 if no title is provided', () => {
    const sut = makeSut()
    const request = {
      body: {
        description: 'any_description',
      }
    }
    const response = sut.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('MissingParamError: title'))
  })
  test('should return 400 if no date is provided', () => {
    const sut = makeSut()
    const request = {
      body: {
        title: 'any_title',
        description: 'any_description',
      }
    }
    const response = sut.handle(request)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual(new Error('MissingParamError: date'))
  })
})