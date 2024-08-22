import { NoteModel } from 'src/notes/schemas'
import { TaskModel } from 'src/tasks/schemas'
import { IWeekDay } from '../interfaces'

interface IBuildWeekParams {
  startOfWeek: Date
  endOfWeek: Date
  notes: NoteModel[]
  tasks: TaskModel[]
}

export const buildWeekDays = ({
  startOfWeek,
  endOfWeek,
  notes,
  tasks,
}: IBuildWeekParams): IWeekDay[] => {
  const weekDays = []

  for (let i = startOfWeek; i <= endOfWeek; i.setDate(i.getDate() + 1)) {
    const currentDate = new Date(i)

    const noteForDay = notes.find((note) => {
      const noteDate = new Date(note.date)
      return (
        noteDate.toISOString().slice(0, 10) ===
        currentDate.toISOString().slice(0, 10)
      )
    })

    const tasksForDay = tasks.filter((task) => {
      const taskDate = new Date(task.date)
      return (
        taskDate.toISOString().slice(0, 10) ===
        currentDate.toISOString().slice(0, 10)
      )
    })

    const tasksResult = tasksForDay.length > 0 ? tasksForDay : null

    weekDays.push({
      notes: noteForDay || null,
      completedTasks: tasksResult,
      date: currentDate,
    })
  }

  return weekDays
}
