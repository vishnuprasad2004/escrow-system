import { IsNumber } from "class-validator";
import { Types } from "mongoose";

export class CreateEscrowDto {
  // readonly pendingTransactionsID: Types.ObjectId;
  readonly initiatingUserName: string;
  readonly receivingUserName: string;
  @IsNumber()
  readonly totalAmount: number;
}

export class UpdateEscrowDto {
  readonly pendingTransactionsID: string;
  readonly status: 'ACTIVE' | 'RELEASED' | 'REFUNDED';
}
