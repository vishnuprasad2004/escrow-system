import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Escrow extends Document {
  @Prop({ type: { type: Types.ObjectId, ref: 'Transaction' }})
  pendingTransactionsID: Types.ObjectId;

  @Prop({ enum: ['ACTIVE', 'RELEASED', 'REFUNDED'], default: 'ACTIVE' })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  initiatingUserID: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  receivingUserID: Types.ObjectId;

  @Prop({ required: true })
  totalAmount: number;
}

export const EscrowSchema = SchemaFactory.createForClass(Escrow);
