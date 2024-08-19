import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
} from '@nestjs/common'
import { Request as IRequest } from 'express'
import { AuthService } from './auth.service'
import {
  JwtAuthGuard,
  LocalAuthGuard,
  RefreshJwtGuard,
} from 'src/common/guards'
import { RegisterUserDto } from './dto'
import { IAuthResponse } from './interfaces'
import { UserModel } from 'src/users/schemas'

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
  login(@Req() req: IRequest): Promise<IAuthResponse> {
    return this.authService.login(req.user as UserModel)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Req() req: IRequest): Promise<{ message: string }> {
    const user = req.user as UserModel
    return this.authService.logout(user.id)
  }

  @UseGuards(RefreshJwtGuard)
  @Post('refresh')
  async refreshToken(@Req() req: IRequest) {
    return this.authService.refreshToken(req.user as UserModel)
  }
}
