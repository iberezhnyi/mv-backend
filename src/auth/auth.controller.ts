import {
  Controller,
  Post,
  Body,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  Get,
} from '@nestjs/common'
import { Request, Response } from 'express'
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
  async register(
    @Body() userData: RegisterUserDto,
    @Res() res: Response,
  ): Promise<IAuthResponse> {
    const response = await this.authService.register(userData, res)
    res.json(response)
    return response
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<IAuthResponse> {
    const response = await this.authService.login(req.user as UserModel, res)
    res.json(response)
    return response
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('profile')
  async getProfile(@Req() req: Request): Promise<IAuthResponse> {
    return await this.authService.getProfile(req.user as UserModel)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<{ message: string }> {
    const user = req.user as UserModel
    const response = await this.authService.logout(user.id, res)
    res.json(response)
    return response
  }

  @UseGuards(RefreshJwtGuard)
  @Get('refresh')
  async refreshTokens(@Req() req: Request, @Res() res: Response) {
    const response = await this.authService.refreshTokens(
      req.user as UserModel,
      res,
    )
    res.json(response)
    return response
  }
}
