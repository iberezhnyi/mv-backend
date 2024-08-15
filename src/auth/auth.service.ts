import { ConflictException, Injectable } from '@nestjs/common'
import { Model } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt'
import { User, UserDocument } from 'src/users/schemas'
import { RegisterUserDto } from './dto'
import { IAuthResponse } from './interfaces'

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,

    private readonly jwtService: JwtService,
  ) {}

  private async generateAndUpdateToken(
    id: UserDocument['id'],
  ): Promise<string> {
    const access_token = this.jwtService.sign({ id })
    await this.userModel.findByIdAndUpdate(id, { access_token })

    return access_token
  }

  async normalizedEmailAndFindUser(email: RegisterUserDto['email']) {
    const normalizedEmail = email.toLowerCase()
    const user = await this.userModel.findOne({
      email: normalizedEmail,
    })

    return { user, normalizedEmail }
  }

  async register(userData: RegisterUserDto): Promise<IAuthResponse> {
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

    const access_token = await this.generateAndUpdateToken(user._id)

    return {
      message: 'Registration successful',
      access_token,
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
      },
    }
  }

  async login(user: UserDocument): Promise<IAuthResponse> {
    const access_token = await this.generateAndUpdateToken(user._id)

    return {
      message: 'Login successful',
      access_token,
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
      },
    }
  }

  async logout(id: Pick<UserDocument, 'id'>): Promise<{ message: string }> {
    console.log('id :>> ', id)
    await this.userModel.findByIdAndUpdate(id, { access_token: null })
    return { message: 'Logout successful' }
  }
}
