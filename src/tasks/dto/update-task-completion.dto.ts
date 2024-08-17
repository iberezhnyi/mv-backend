import { IsNotEmpty, IsString } from 'class-validator'

export class UpdateTaskCompletionDto {
  @IsString()
  @IsNotEmpty()
  taskId: string

  // @IsString()
  // @IsNotEmpty()
  // userId: string
}
