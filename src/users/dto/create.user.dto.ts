import { Transform } from 'class-transformer'
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  password: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsEnum(['starter', 'pro', 'business'])
  @IsOptional()
  @Transform(({ value }) => value || 'starter')
  subscription?: string
}
