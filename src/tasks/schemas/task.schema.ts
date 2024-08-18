import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

@Schema({ collection: 'tasks', timestamps: true })
export class TaskModel extends Document {
  @Prop({
    enum: ['daily', 'weekly', 'monthly'],
    required: [true, 'Type is required'],
    type: String,
  })
  type: 'daily' | 'weekly' | 'monthly'

  @Prop({
    required: [true, 'Title is required'],
    type: String,
  })
  title: string

  @Prop({
    type: String,
  })
  description?: string

  @Prop({
    required: [true, 'Date is required'],
    type: Date,
  })
  date: Date

  @Prop({
    type: Map,
    of: Boolean,
    default: {},
  })
  completedBy: Map<string, boolean>
}

export const TaskModelSchema = SchemaFactory.createForClass(TaskModel)
