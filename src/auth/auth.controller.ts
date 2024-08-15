import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Request,
} from '@nestjs/common'
import { Request as IRequest } from 'express'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from 'src/guards'
import { UserDocument } from 'src/users/schemas'
import { RegisterUserDto } from './dto'
import { IAuthResponse } from './interfaces'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Request() req: IRequest): Promise<IAuthResponse> {
    return this.authService.login(req.user as UserDocument)
  }

  @Post('register')
  register(@Body() userData: RegisterUserDto): Promise<IAuthResponse> {
    return this.authService.register(userData)
  }
}
