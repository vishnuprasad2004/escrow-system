import { Types } from "mongoose";
import { IsEmail, IsInt } from "class-validator"

export class CreateUserDto {
  readonly name: string;
  @IsEmail()
  readonly email: string;
  readonly wallet: {
    transactions?: Types.ObjectId[];
    moneyAmount: number;
  }
}

export class UpdateUserDto {
  readonly name?: string;
  @IsEmail()
  readonly email?: string;
  readonly accessToken?: string;
  readonly wallet?: {
    transactions?: Types.ObjectId[];
    moneyAmount?: number;
  };
}
