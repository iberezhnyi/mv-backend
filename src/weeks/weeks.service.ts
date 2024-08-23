import { Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { TaskModel } from 'src/tasks/schemas'
import { NoteModel } from 'src/notes/schemas'
import {
  buildWeekDays,
  findNotesForWeek,
  findTasksForWeek,
  getWeekStartAndEnd,
} from './helpers'
import { IGetWeekParams, IGetWeekResponse } from './interfaces'

@Injectable()
export class WeeksService {
  constructor(
    @InjectModel(NoteModel.name)
    private readonly noteModel: Model<NoteModel>,

    @InjectModel(TaskModel.name)
    private readonly taskModel: Model<TaskModel>,
  ) {}

  async getWeekInfo({ user, date }: IGetWeekParams): Promise<IGetWeekResponse> {
    const { id: owner } = user
    const { startOfWeek, endOfWeek } = getWeekStartAndEnd(date)

    console.log('startOfWeek1 :>> ', startOfWeek)
    console.log('endOfWeek1 :>> ', endOfWeek)

    const notes = await findNotesForWeek({
      noteModel: this.noteModel,
      owner,
      startOfWeek,
      endOfWeek,
    })

    const tasks = await findTasksForWeek({
      taskModel: this.taskModel,
      owner,
      startOfWeek,
      endOfWeek,
    })

    console.log('startOfWeek2 :>> ', startOfWeek)
    console.log('endOfWeek2 :>> ', endOfWeek)

    const weekDays = buildWeekDays({ startOfWeek, endOfWeek, notes, tasks })

    console.log('startOfWeek :>> ', startOfWeek)
    console.log('endOfWeek :>> ', endOfWeek)

    return {
      message: `Week from ${startOfWeek} till ${endOfWeek}`,
      weekDays,
    }
  }
}
