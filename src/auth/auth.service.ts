import { ConflictException, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { RegisterUserDto } from './dto'
import { IAuthResponse } from './interfaces'
import { UserModel } from 'src/users/schemas'
import { ConfigService } from '@nestjs/config'
import { Response } from 'express'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel.name) private readonly userModel: Model<UserModel>,

    private readonly jwtService: JwtService,

    private readonly configService: ConfigService,
  ) {}

  private async generateAndUpdateTokens(
    id: UserModel['id'],
  ): Promise<Pick<IAuthResponse, 'access_token' | 'refresh_token'>> {
    const access_token = this.jwtService.sign({ id })
    const refresh_token = this.jwtService.sign(
      { id },
      {
        expiresIn: '3m',
        secret: this.configService.get<string>('REFRESH_JWT_SECRET'),
      },
    )

    if (!access_token || !refresh_token) {
      throw new Error('Error generating tokens')
    }

    await this.userModel.findByIdAndUpdate(id, { refresh_token })

    return { access_token, refresh_token }
  }

  private setRefreshTokenCookie(refresh_token: string, res: Response): void {
    res.cookie('refresh_token', refresh_token, {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
    })
  }

  async normalizedEmailAndFindUser(email: RegisterUserDto['email']) {
    const normalizedEmail = email.toLowerCase()
    const user = await this.userModel.findOne({
      email: normalizedEmail,
    })

    return { user, normalizedEmail }
  }

  async register(
    userData: RegisterUserDto,
    res: Response,
  ): Promise<IAuthResponse> {
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
      user._id,
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

  async login(user: UserModel, res: Response): Promise<IAuthResponse> {
    const { access_token, refresh_token } = await this.generateAndUpdateTokens(
      user._id,
    )

    console.log('this.configService :>> ', this.configService)

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

  async getProfile(user: UserModel): Promise<any> {
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

  async logout(
    id: Pick<UserModel, 'id'>,
    res: Response,
  ): Promise<{ message: string }> {
    console.log('id :>> ', id)
    await this.userModel.findByIdAndUpdate(id, {
      refresh_token: null,
    })

    res.cookie('refresh_token', '', {
      httpOnly: true,
      secure: this.configService.get<string>('NODE_ENV') === 'production',
      sameSite: 'lax',
      expires: new Date(0),
    })

    return { message: 'Logout successful' }
  }

  async refreshTokens(user: UserModel, res: Response): Promise<IAuthResponse> {
    const { access_token, refresh_token } = await this.generateAndUpdateTokens(
      user._id,
    )

    this.setRefreshTokenCookie(refresh_token as string, res)

    return {
      message: 'Refresh successful',
      access_token,
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
        role: user.roles[0],
      },
    }
  }
}
