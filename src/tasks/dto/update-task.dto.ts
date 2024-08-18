import { PartialType } from '@nestjs/swagger'
import { CreateTaskDto } from './create-task.dto'
import { IsOptional, IsString } from 'class-validator'

export class UpdateTaskDto extends PartialType(CreateTaskDto) {
  @IsString()
  @IsOptional()
  taskId: string
}
