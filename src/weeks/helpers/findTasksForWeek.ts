import { Model } from 'mongoose'
import { TaskModel } from 'src/tasks/schemas'

interface IFindTasksForWeekParams {
  taskModel: Model<TaskModel>
  owner: string
  startOfWeek: Date
  endOfWeek: Date
}

export async function findTasksForWeek({
  taskModel,
  owner,
  startOfWeek,
  endOfWeek,
}: IFindTasksForWeekParams) {
  return taskModel

    .find({
      date: { $gte: startOfWeek, $lte: endOfWeek },
      [`completedBy.${owner}`]: true,
    })
    .select('-completedBy -createdAt -updatedAt -__v')
    .exec()
}
