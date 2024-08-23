import { Controller, Get, Query } from '@nestjs/common'
import { MonthsService } from './months.service'
import { IMonthsResponse } from './interfaces'

@Controller('months')
export class MonthsController {
  constructor(private readonly monthsService: MonthsService) {}

  @Get()
  async getMonthInfo(
    @Query('month') month: string,
    @Query('year') year: string,
  ): Promise<IMonthsResponse> {
    return await this.monthsService.getMonthInfo({
      monthData: month,
      yearData: year,
    })
  }
}
