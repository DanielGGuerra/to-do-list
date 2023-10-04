import { TaskModel } from "../../../domain/models/task.model"
import { InsertTaskModel } from "../../../domain/usecases/insert-task.usecase"
import { InsertTaskRepository } from "../../protocols/insert-task-repository"
import { DbInsertTask } from "./db-insert-task"

const makeFakeTaskData = (): InsertTaskModel => ({
  title: 'valid_title',
  description: 'valid_description',
  date: new Date(2023, 1, 1, 1, 1)
})

const makeFakeTaskModel = (): TaskModel => ({
  id: 'valid_id',
  title: 'valid_title',
  description: 'valid_description',
  date: new Date(2023, 1, 1, 1)
})

const makeInsertTaskRepositoryStub = (): InsertTaskRepository => {
  class InsertTaskRepositoryStup implements InsertTaskRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    insert (taskData: InsertTaskModel): Promise<TaskModel> {
      return Promise.resolve(makeFakeTaskModel())
    }
  }
  return new InsertTaskRepositoryStup()
}

const makeSut = () => {
  const insertTaskRepositoryStup = makeInsertTaskRepositoryStub()
  const sut = new DbInsertTask(insertTaskRepositoryStup)
  return {
    sut,
    insertTaskRepositoryStup
  }
}

describe('DbInsertTask Usecase', () => {
  test('should call InsertTaskRepository with correct values', async () => {
    const { sut, insertTaskRepositoryStup } = makeSut()
    const insertSpy = jest.spyOn(insertTaskRepositoryStup, 'insert')
    await sut.insert(makeFakeTaskData())
    expect(insertSpy).toHaveBeenCalledWith(makeFakeTaskData())
  })
  test('should throws if InsertTaskRepository throws', async () => {
    const { sut, insertTaskRepositoryStup } = makeSut()
    
    jest.spyOn(insertTaskRepositoryStup, 'insert').mockResolvedValueOnce(Promise.reject(new Error()))

    const response = sut.insert(makeFakeTaskData())

    expect(response).rejects.toThrow()
  })
  test('should return an task on success', async () => {
    const { sut } = makeSut()
    const response = await sut.insert(makeFakeTaskData())
    expect(response).toEqual(makeFakeTaskModel())
  })
})