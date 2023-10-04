import { TaskModel } from "../../../domain/models/task.model"
import { InsertTaskModel } from "../../../domain/usecases/insert-task.usecase"
import { InsertTaskRepository } from "../protocols/insert-task-repository"
import { DbInsertTask } from "./db-insert-task"

describe('DbInsertTask Usecase', () => {
  test('should call InsertTaskRepository with correct values', async () => {
    class InsertTaskRepositoryStup implements InsertTaskRepository {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      insert (taskData: InsertTaskModel): Promise<TaskModel> {
        return Promise.resolve({
          id: 'valid_id',
          title: 'valid_title',
          description: 'valid_description',
          date: new Date(2023, 1, 1, 1)
        })
      }
    }
    
    const insertTaskRepositoryStup = new InsertTaskRepositoryStup()
    const sut = new DbInsertTask(insertTaskRepositoryStup)

    const insertSpy = jest.spyOn(insertTaskRepositoryStup, 'insert')

    const taskModel = {
      title: 'valid_title',
      description: 'valid_description',
      date: new Date(2023, 1, 1, 1, 1)
    }

    await sut.insert(taskModel)

    expect(insertSpy).toHaveBeenCalledWith({
      title: 'valid_title',
      description: 'valid_description',
      date: new Date(2023, 1, 1, 1, 1)
    })
  })
})