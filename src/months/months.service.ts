import { Injectable } from '@nestjs/common'
import { getDaysInMonth } from 'src/common/helpers'

@Injectable()
export class MonthsService {
  async getMonthInfo(): Promise<any> {
    const { daysInMonth, month, year } = getDaysInMonth()
    const monthList = []

    for (let index = 1; index <= daysInMonth; index += 1) {
      monthList.push({
        date: {
          day: index,
          month,
          year,
        },
      })
    }

    return monthList
  }
}
