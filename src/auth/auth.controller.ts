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
import { JwtAuthGuard, LocalAuthGuard } from 'src/guards'
import { UserDocument } from 'src/users/schemas'
import { RegisterUserDto } from './dto'
import { IAuthResponse } from './interfaces'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() userData: RegisterUserDto): Promise<IAuthResponse> {
    return this.authService.register(userData)
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Request() req: IRequest): Promise<IAuthResponse> {
    return this.authService.login(req.user as UserDocument)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Request() req: IRequest): Promise<{ message: string }> {
    const user = req.user as UserDocument
    return this.authService.logout(user.id)
  }
}
