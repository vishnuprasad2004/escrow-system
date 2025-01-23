import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Escrow } from './escrow.schema';
import mongoose, { Model, Mongoose } from 'mongoose';
import { CreateEscrowDto } from './escrow.dto';
import { Transaction } from 'src/transactions/transactions.schema';
import { User } from 'src/users/users.schema';

@Injectable()
export class EscrowService {
  constructor(
    @InjectModel(Escrow.name) private EscrowModel: Model<Escrow>, 
    @InjectModel(Transaction.name) private TransactionModel: Model<Transaction>,
    @InjectModel(User.name) private UserModel: Model<User>
  ) {}

  // TODO
  async getEscrows() {
    return await this.EscrowModel.find().populate("initiatingUserID").populate("receivingUserID").exec();
  }

  async createEscrowTransaction(escrowBodyReq:CreateEscrowDto) {
    // const session = await mongoose.startSession();
    try {

      // session.startTransaction();
      const { initiatingUserName, receivingUserName, totalAmount } = escrowBodyReq;
      //finding the users first
      const initiatingUser = await this.UserModel.findOne({name: initiatingUserName});
      const receivingUser = await this.UserModel.findOne({name: receivingUserName});
      console.log(initiatingUser, receivingUser);
      
      if(!initiatingUser || !receivingUser) {
        throw new Error("Invalid user");
      }
      const {wallet: {moneyAmount}} = initiatingUser;
      if(moneyAmount < totalAmount) {
        throw new Error("Insufficient funds");
      }

      //creating the transaction
      const transaction = await this.TransactionModel.create({
        amount: totalAmount,
        fromUserID: initiatingUser._id,
        toUserID: receivingUser._id,
        status: "PENDING"
      });

      console.log(transaction);
      
  
      //updating the users wallet
      await this.UserModel.updateOne(
        { name: initiatingUserName }, 
        {
          $push: { transactions: transaction._id }, 
          $set: { "wallet.moneyAmount": moneyAmount - totalAmount }
        }
      ).exec();
      await this.UserModel.updateOne({name: receivingUserName}, {$push: {transactions: transaction._id}}).exec();
      //creating the escrow
      const newEscrow = await this.EscrowModel.create({
        transactions: transaction._id,
        initiatingUserID: initiatingUser._id ,
        receivingUserID: receivingUser._id,
        totalAmount: totalAmount,
        status: "ACTIVE"
      });
      console.log(newEscrow);
      
  
      // await session.commitTransaction();
      
      return {message: "New Escrow Transaction Created.",newEscrow};
      
    } catch (e:any) {
      // await session.abortTransaction();
      console.log(e);
      return {message: e.message};

    } finally {
      // session.endSession();
    }
  }

  // To test this function, you can use this : 67923e2bc6b16fb5e7acfabd
  async processEscrowTransaction(escrowID: string, status: string) {
    try {
      const escrow = await this.EscrowModel.findById(escrowID);
      if(!escrow) {
        throw new Error("Invalid Escrow ID");
      }
      console.log(escrow);
      
      if(escrow.status == "RELEASED" || escrow.status == "REFUNDED") {
        throw new Error("Escrow already processed");
      }
      if(status == "RELEASED") {

        await this.EscrowModel.updateOne({_id: escrowID}, {status: "RELEASED"}).exec();
        await this.TransactionModel.findByIdAndUpdate({_id: escrow.pendingTransactionsID}, {status: "COMPLETED"}).exec();
        await this.UserModel.updateOne({_id: escrow.initiatingUserID}, {$inc: {"wallet.moneyAmount": -escrow.totalAmount}}).exec();
        // await this.UserModel.updateOne({_id: escrow.receivingUserID}, {$inc: {"wallet.moneyAmount": escrow.totalAmount}}).exec();

      } else if(status == "REFUNDED") {

        await this.EscrowModel.updateOne({_id: escrowID}, {status: "REFUNDED"}).exec();
        // await this.TransactionModel.updateOne({_id: escrow.transactions}, {status: "CANCELLED"}).exec();
        await this.UserModel.updateOne({_id: escrow.initiatingUserID}, {$inc: {"wallet.moneyAmount": escrow.totalAmount}}).exec();
        // await this.UserModel.updateOne({_id: escrow.receivingUserID}, {$inc: {"wallet.moneyAmount": -escrow.totalAmount}}).exec();
      } else {
        throw new Error("Invalid status");
      }
      return {message: "Escrow Transaction Updated"};
    } catch (e:any) {
      console.log(e);
      return {message: e.message};
    }
  }

}