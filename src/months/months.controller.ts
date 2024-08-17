import { Controller, Get } from '@nestjs/common'
import { MonthsService } from './months.service'

@Controller('months')
export class MonthsController {
  constructor(private readonly monthsService: MonthsService) {}

  @Get()
  getMonthInfo(): Promise<any> {
    return this.monthsService.getMonthInfo()
  }
}
