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
    const token = this.jwtService.sign({ id })
    await this.userModel.findByIdAndUpdate(id, { token })

    return token
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

    const token = await this.generateAndUpdateToken(user._id)

    return {
      message: 'Registration successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
      },
    }
  }

  async login(user: UserDocument): Promise<IAuthResponse> {
    const token = await this.generateAndUpdateToken(user._id)

    return {
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        subscription: user.subscription,
      },
    }
  }
}
