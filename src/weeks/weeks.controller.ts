import { Controller, Get, UseGuards, Request, Query } from '@nestjs/common'
import { WeeksService } from './weeks.service'
import { JwtAuthGuard } from 'src/common/guards'
import { Request as IRequest } from 'express'
import { UserModel } from 'src/users/schemas'

@Controller('weeks')
export class WeeksController {
  constructor(private readonly weeksService: WeeksService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getWeekInfo(@Request() req: IRequest, @Query('date') date: string) {
    return this.weeksService.getWeekInfo(req.user as UserModel, new Date(date))
  }
}
