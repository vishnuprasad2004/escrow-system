import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: [true, "Please share your Name"] })
  name: string;

  @Prop({ required: [true,"Please share your Email"], unique: true })
  email: string;

  @Prop()
  accessToken?: string;

  @Prop({
    type: {
      transactions: { type: [{ type: Types.ObjectId, ref: 'Transaction' }], default: [] },
      moneyAmount: { type: Number, required: true, default: 0 },
    },
    required: true,
  })
  wallet: {
    transactions: Types.ObjectId[];
    moneyAmount: number;
  };
}

export const UserSchema = SchemaFactory.createForClass(User);
