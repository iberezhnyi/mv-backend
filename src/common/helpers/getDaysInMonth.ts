import { getCurrentMonth } from './getCurrentMonth'
import { getCurrentYear } from './getCurrentYear'

interface IGetDaysInMonth {
  daysInMonth: number
  month: number
  year: number
}

interface IGetDaysInMonthParams {
  monthData?: number
  yearData?: number
}

export const getDaysInMonth = ({
  monthData,
  yearData,
}: IGetDaysInMonthParams): IGetDaysInMonth => {
  const year = yearData || getCurrentYear()
  const month = monthData || getCurrentMonth()

  return {
    daysInMonth: new Date(year, month, 0).getDate(),
    month: month,
    year: year,
  }
}
