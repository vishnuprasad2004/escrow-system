import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EscrowController } from './escrow.controller';
import { Escrow, EscrowSchema } from './escrow.schema';
import { EscrowService } from './escrow.service';
import { Transaction, TransactionSchema } from 'src/transactions/transactions.schema';
import { User, UserSchema } from '../users/users.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Escrow.name, schema: EscrowSchema }]),
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [EscrowController],
  providers: [EscrowService],
})
export default class EscrowModule {}
