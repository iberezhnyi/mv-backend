import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common'
import { ConfigService } from 'src/common/configs'
import { Response } from 'express'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { UserModel } from 'src/users/schemas'
import {
  IAuthParams,
  IAuthRegister,
  IAuthResponse,
  IAuthTokens,
  ILogoutResponse,
  IProfileResponse,
  IRefreshResponse,
} from './interfaces'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,

    private readonly jwtService: JwtService,

    private readonly configService: ConfigService,
  ) {}

  private async generateAndUpdateTokens(id: string): Promise<IAuthTokens> {
    const access_token = this.jwtService.sign({ id })
    const refresh_token = this.jwtService.sign(
      { id },
      {
        expiresIn: '7d',
        secret: this.configService.refreshJwtSecret,
      },
    )

    if (!access_token || !refresh_token) {
      throw new InternalServerErrorException()
    }

    await this.userModel.findByIdAndUpdate(id, { refresh_token })

    return { access_token, refresh_token }
  }

  private setRefreshTokenCookie(refresh_token: string, res: Response): void {
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.isProduction,
      sameSite: 'lax',
    })
  }

  async normalizedEmailAndFindUser(email: string) {
    const normalizedEmail = email.toLowerCase()
    const user = await this.userModel.findOne({
      email: normalizedEmail,
    })

    return { user, normalizedEmail }
  }

  async register({ userData, res }: IAuthRegister): Promise<IAuthResponse> {
    const { email, password, subscription } = userData

    const { user: emailExist, normalizedEmail } =
      await this.normalizedEmailAndFindUser(email)

    if (emailExist !== null) {
      throw new ConflictException(`Email ${normalizedEmail} already exists`)
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await this.userModel.create({
      email: normalizedEmail,
      password: hashedPassword,
      subscription,
    })

    const { access_token, refresh_token } = await this.generateAndUpdateTokens(
      user._id as string,
    )

    this.setRefreshTokenCookie(refresh_token as string, res)

    return {
      message: 'Registration successful',
      access_token,
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
        role: user.roles[0],
      },
    }
  }

  async login({ user, res }: IAuthParams): Promise<IAuthResponse> {
    const { access_token, refresh_token } = await this.generateAndUpdateTokens(
      user._id as string,
    )

    this.setRefreshTokenCookie(refresh_token as string, res)

    return {
      message: 'Login successful',
      access_token,
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
        role: user.roles[0],
      },
    }
  }

  async getProfile(user: UserModel): Promise<IProfileResponse> {
    return {
      message: 'Profile fetched successfully',
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
        role: user.roles[0],
      },
    }
  }

  async logout({ user, res }: IAuthParams): Promise<ILogoutResponse> {
    await this.userModel.findByIdAndUpdate(user.id, {
      refresh_token: null,
    })

    res.cookie('refresh_token', '', {
      httpOnly: true,
      secure: this.configService.isProduction,
      sameSite: 'lax',
      expires: new Date(0),
    })

    return { message: 'Logout successful' }
  }

  async refreshTokens({ user, res }: IAuthParams): Promise<IRefreshResponse> {
    const { access_token, refresh_token } = await this.generateAndUpdateTokens(
      user._id as string,
    )

    this.setRefreshTokenCookie(refresh_token as string, res)

    return {
      message: 'Refresh successful',
      access_token,
    }
  }
}
