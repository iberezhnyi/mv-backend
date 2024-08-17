import { getCurrentMonth } from './getCurrentMonth'
import { getCurrentYear } from './getCurrentYear'

interface IGetDaysInMonth {
  daysInMonth: number
  month: number
  year: number
}

export const getDaysInMonth = (
  year: number = getCurrentYear(),
  month: number = getCurrentMonth(),
): IGetDaysInMonth => {
  return {
    daysInMonth: new Date(year, month, 0).getDate(),
    month: month,
    year: year,
  }
}
