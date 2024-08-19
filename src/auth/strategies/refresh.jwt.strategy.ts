import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Request } from 'express'
import { UserModel } from 'src/users/schemas'

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(
  Strategy,
  'refresh-jwt',
) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(UserModel.name)
    private readonly userModel: Model<UserModel>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromBodyField('refresh'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('REFRESH_JWT_SECRET'),
      passReqToCallback: true,
    })
  }

  async validate(
    req: Request,
    payload: Pick<UserModel, 'id'>,
  ): Promise<UserModel> {
    const user = await this.userModel.findById(payload.id)

    if (user === null) {
      throw new UnauthorizedException('User not found!!!!')
    }

    const refreshToken = req.body.refresh

    if (user.refresh_token !== refreshToken) {
      throw new UnauthorizedException('Invalid refresh token')
    }

    return user
  }
}
