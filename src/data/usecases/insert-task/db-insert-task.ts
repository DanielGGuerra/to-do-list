import { TaskModel } from "../../../domain/models/task.model";
import { InsertTask, InsertTaskModel } from "../../../domain/usecases/insert-task.usecase";
import { InsertTaskRepository } from "../protocols/insert-task-repository";

export class DbInsertTask implements InsertTask {
  constructor(
    private readonly insertTaskRepository: InsertTaskRepository
  ) {}
  
  async insert (task: InsertTaskModel): Promise<TaskModel> {
    return await this.insertTaskRepository.insert(task)
  }
}