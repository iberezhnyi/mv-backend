interface IGetWeekStartAndEnd {
  startOfWeek: Date
  endOfWeek: Date
}

export const getWeekStartAndEnd = (date: Date): IGetWeekStartAndEnd => {
  const startOfWeek = new Date(date)

  const dayOfWeek = startOfWeek.getDay()

  const diffToMonday = (dayOfWeek + 6) % 7
  startOfWeek.setDate(startOfWeek.getDate() - diffToMonday)

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6)

  return { startOfWeek, endOfWeek }
}
