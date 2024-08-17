import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsOptional()
  @IsString()
  description?: string

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date

  @IsEnum(['daily', 'weekly', 'monthly'])
  @IsNotEmpty()
  type: 'daily' | 'weekly' | 'monthly'
}
