import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'
import { UserModel } from 'src/users/schemas'

@Schema({ collection: 'notes', timestamps: true })
export class NoteModel extends Document {
  @Prop({
    required: [true, 'Date is required'],
    type: Date,
  })
  date: string

  @Prop({
    required: [true, 'Note is required'],
    type: String,
  })
  note: string

  @Prop({
    type: Types.ObjectId,
    ref: UserModel.name,
    required: true,
  })
  owner: Types.ObjectId
}

export const NoteModelSchema = SchemaFactory.createForClass(NoteModel)
