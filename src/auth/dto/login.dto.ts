import { PickType } from '@nestjs/swagger'
import { RegisterUserDto } from './register-user.dto'

export class LoginDto extends PickType(RegisterUserDto, [
  'email',
  'password',
] as const) {}
