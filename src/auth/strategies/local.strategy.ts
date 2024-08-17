import { Injectable, UnauthorizedException } from '@nestjs/common'
import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import * as bcrypt from 'bcrypt'
import { AuthService } from '../auth.service'
// import { UserDocument } from 'src/users/schemas'
import { LoginDto } from '../dto'
import { UserModel } from 'src/users/schemas'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'email' })
  }

  async validate(
    email: LoginDto['email'],
    password: LoginDto['password'],
  ): Promise<UserModel> {
    const { user } = await this.authService.normalizedEmailAndFindUser(email)

    if (user === null) {
      throw new UnauthorizedException('Invalid email or password!')
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (isPasswordValid === false) {
      throw new UnauthorizedException('Invalid email or password!')
    }

    return user
  }
}
