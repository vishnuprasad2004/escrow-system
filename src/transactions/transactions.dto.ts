import { Types } from "mongoose";

export class CreateTransactionDto {
  readonly fromUserID: Types.ObjectId;
  readonly toUserID: Types.ObjectId;
  readonly amount: number;
}

export class UpdateTransactionDto {
  readonly status?: 'PENDING' | 'COMPLETED' | 'FAILED';
}
