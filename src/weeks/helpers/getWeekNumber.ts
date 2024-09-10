export const getISOWeekNumber = (date: Date): number => {
  const tempDate = new Date(date.getTime())

  // Переход на понедельник
  const dayNumber = (tempDate.getUTCDay() + 6) % 7
  tempDate.setUTCDate(tempDate.getUTCDate() - dayNumber + 3)

  // Устанавливаем 4-е января для расчета первой недели
  const firstThursday = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 4))
  const firstDayOfYear = (firstThursday.getUTCDay() + 6) % 7

  // Первая неделя - та, которая содержит 4-е января
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayOfYear + 3)

  // Разница в днях и расчёт номера недели
  const weekNumber =
    Math.floor(
      (tempDate.getTime() - firstThursday.getTime()) / (7 * 24 * 3600 * 1000),
    ) + 1

  return weekNumber
}
