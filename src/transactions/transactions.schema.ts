import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document, Types} from 'mongoose';

@Schema({ timestamps: true })
export class Transaction extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  fromUserID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  toUserID: Types.ObjectId;

  @Prop({ required: true })
  amount: number;

  @Prop({ enum: ['PENDING', 'COMPLETED', 'FAILED'], default: 'PENDING' })
  status: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
