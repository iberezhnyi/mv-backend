import { Controller, Get, UseGuards, Query, Req } from '@nestjs/common'
import { Request } from 'express'
import { JwtAuthGuard } from 'src/common/guards'
import { UserModel } from 'src/users/schemas'
import { WeeksService } from './weeks.service'

@Controller('weeks')
export class WeeksController {
  constructor(private readonly weeksService: WeeksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getWeekInfo(@Req() req: Request, @Query('date') date: string) {
    const user = req.user as UserModel

    return await this.weeksService.getWeekInfo({ user, date: new Date(date) })
  }
}
