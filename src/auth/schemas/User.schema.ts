import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  accessToken?: string;

  @Prop({ type: Types.ObjectId, ref: 'Wallet', required: true })
  walletID: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
