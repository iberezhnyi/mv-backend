import { PartialType } from '@nestjs/swagger'
import { RegisterUserDto } from 'src/auth/dto'

export class UpdateUserDto extends PartialType(RegisterUserDto) {}
