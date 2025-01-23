import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";
import * as bcrypt from "bcrypt";


@Schema({ timestamps: true })
export class User extends Document {
  @Prop({ required: [true, "Please share your Name"] })
  name: string;

  @Prop({ required: [true,"Please share your Email"], unique: true })
  email: string;

  @Prop()
  accessToken?: string;

  @Prop({required: [true, "Please create your Password"]})
  password: string;

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

const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export { UserSchema }
