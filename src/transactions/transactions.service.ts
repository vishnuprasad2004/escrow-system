import { Injectable } from "@nestjs/common";
import { Transaction } from "./transactions.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";




@Injectable()
export class TransactionService {
  constructor(@InjectModel(Transaction.name) private transactionModel: Model<Transaction>) {}

  async getTransactions() {}
}