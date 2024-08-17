import { IsDate, IsNotEmpty, IsString } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateNoteDto {
  @IsString()
  @IsNotEmpty()
  note: string

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date
}
