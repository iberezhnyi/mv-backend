import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Request } from 'express'
import { User, UserDocument } from 'src/users/schemas'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
      passReqToCallback: true,
    })
  }

  async validate(
    req: Request,
    payload: Pick<UserDocument, 'id'>,
  ): Promise<UserDocument> {
    const user = await this.userModel.findById(payload.id)

    if (user === null) {
      throw new UnauthorizedException('User not found')
    }

    const tokenFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()(req)

    if (user.access_token !== tokenFromRequest) {
      throw new UnauthorizedException('Invalid token')
    }

    return user
  }
}
