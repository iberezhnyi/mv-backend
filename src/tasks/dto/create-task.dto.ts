import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator'
import { Type } from 'class-transformer'

export class CreateTaskDto {
  @IsEnum(['daily', 'weekly', 'monthly'], {
    message: 'Type must be one of the following values: daily, weekly, monthly',
  })
  @IsNotEmpty()
  type: 'daily' | 'weekly' | 'monthly'

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
}
