import { TaskModel } from "../../domain/models/task.model";
import { InsertTaskModel } from "../../domain/usecases/insert-task.usecase";

export interface InsertTaskRepository {
  insert: (taskData: InsertTaskModel) => Promise<TaskModel>
}