interface IGetWeekStartAndEnd {
  startOfWeek: Date
  endOfWeek: Date
}

export const getWeekStartAndEnd = (date: Date): IGetWeekStartAndEnd => {
  const startOfWeek = new Date(date)

  const dayOfWeek = startOfWeek.getDay()
  const diffToMonday = (dayOfWeek + 6) % 7 // Смещение от понедельника
  startOfWeek.setDate(startOfWeek.getDate() - diffToMonday) // Устанавливаем на понедельник

  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6) // Устанавливаем на воскресенье

  return { startOfWeek, endOfWeek }
}
