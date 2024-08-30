import { Model } from 'mongoose'
import { TaskModel } from 'src/tasks/schemas'

interface IFindTasksForWeekParams {
  taskModel: Model<TaskModel>
  ownerId: string
  startOfWeek: Date
  endOfWeek: Date
}

export async function findTasksForWeek({
  taskModel,
  // ownerId,
  startOfWeek,
  endOfWeek,
}: IFindTasksForWeekParams) {
  return taskModel

    .find({
      date: { $gte: startOfWeek, $lte: endOfWeek },
      // [`completedBy.${ownerId}`]: true,
    })
    .select('-createdAt -updatedAt -__v')
    .exec()
}
