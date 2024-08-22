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
import {
  JwtAuthGuard,
  LocalAuthGuard,
  RefreshJwtGuard,
} from 'src/common/guards'
import { UserModel } from 'src/users/schemas'
import { AuthService } from './auth.service'
import { RegisterUserDto } from './dto'
import { IAuthResponse, IProfileResponse } from './interfaces'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() userData: RegisterUserDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAuthResponse> {
    return await this.authService.register({ userData, res })
  }

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<IAuthResponse> {
    const user = req.user as UserModel

    return await this.authService.login({ user, res })
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Req() req: Request): Promise<IProfileResponse> {
    return await this.authService.getProfile(req.user as UserModel)
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('logout')
  async logout(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<{ message: string }> {
    const user = req.user as UserModel

    return await this.authService.logout({ user, res })
  }

  @UseGuards(RefreshJwtGuard)
  @Get('refresh')
  async refreshTokens(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = req.user as UserModel

    return await this.authService.refreshTokens({ user, res })
  }
}
