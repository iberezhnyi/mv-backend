import { Injectable } from '@nestjs/common'
import { getDaysInMonth } from 'src/common/helpers'
import { IMonthsResponse } from './interfaces'
import { v4 as uuidv4 } from 'uuid'

interface IMonthsParams {
  monthData: string
  yearData: string
}

@Injectable()
export class MonthsService {
  async getMonthInfo({
    monthData,
    yearData,
  }: IMonthsParams): Promise<IMonthsResponse> {
    const { daysInMonth, month, year } = getDaysInMonth({
      monthData: Number(monthData),
      yearData: Number(yearData),
    })

    const monthsDays = []

    for (let index = 1; index <= daysInMonth; index += 1) {
      monthsDays.push({
        id: uuidv4(),
        day: index,
        month,
        year,
      })
    }

    return {
      message: `${month} month, ${year} year info`,
      monthsDays,
    }
  }
}
