import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({ timestamps: true })
export class User {
  @Prop({
    required: [true, 'Password is required'],
    type: String,
  })
  password: string

  @Prop({
    required: [true, 'Email is required'],
    unique: true,
    type: String,
  })
  email: string

  @Prop({
    type: String,
    enum: ['starter', 'pro', 'business'],
    default: 'starter',
  })
  subscription: string

  @Prop({
    type: String,
    default: null,
  })
  access_token: string | null
}

export const UserSchema = SchemaFactory.createForClass(User)
