import { Model } from 'mongoose'
import { TaskModel } from 'src/tasks/schemas'

export async function findTasksForWeek(
  taskModel: Model<TaskModel>,
  owner: string,
  startOfWeek: Date,
  endOfWeek: Date,
) {
  return taskModel
    .find({
      date: { $gte: startOfWeek, $lte: endOfWeek },
      [`completedBy.${owner}`]: true,
    })
    .select('-completedBy -createdAt -updatedAt -__v')
    .exec()
}
