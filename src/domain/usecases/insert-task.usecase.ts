import { TaskModel } from "../models/task.model"

export class InsertTaskModel {
  title: string
  description: string
  date: Date
}

export interface InsertTask {
  insert: (task: InsertTaskModel) => Promise<TaskModel>
}