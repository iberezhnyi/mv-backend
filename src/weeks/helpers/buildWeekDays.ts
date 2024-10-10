import { NoteModel } from 'src/notes/schemas'
import { TaskModel } from 'src/tasks/schemas'
import { IWeekDay } from '../interfaces'
import { v4 as uuidv4 } from 'uuid'

interface IBuildWeekParams {
  startOfWeek: Date
  endOfWeek: Date
  notes: NoteModel[]
  tasks: TaskModel[]
  ownerId: string
}

export const buildWeekDays = ({
  startOfWeek,
  endOfWeek,
  notes,
  tasks,
  ownerId,
}: IBuildWeekParams): IWeekDay[] => {
  const weekDays = []

  for (
    let i = new Date(startOfWeek);
    i <= endOfWeek;
    i.setDate(i.getDate() + 1)
  ) {
    const currentDate = new Date(i)

    const noteForDay = notes.find((note) => {
      const noteDate = new Date(note.date)
      return (
        noteDate.toISOString().slice(0, 10) ===
        currentDate.toISOString().slice(0, 10)
      )
    })

    const tasksForDay = tasks

      .filter((task) => {
        const taskDate = new Date(task.date)
        return (
          taskDate.toISOString().slice(0, 10) ===
          currentDate.toISOString().slice(0, 10)
        )
      })

      .map((task) => {
        const completed = task.completedBy?.get(ownerId) === true
        return {
          _id: task._id,
          type: task.type,
          title: task.title,
          description: task.description,
          date: task.date,
          completed,
        }
      })

    const tasksResult = tasksForDay.length > 0 ? tasksForDay : null

    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' })

    weekDays.push({
      id: uuidv4(),
      day: dayName,
      notes: noteForDay || null,
      tasks: tasksResult,
      date: currentDate,
    })
  }

  return weekDays
}
