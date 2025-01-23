import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { getDatabaseConfig } from './config/db.config';
import UserModule from './users/user.module';
import TransactionModule from './transactions/transactions.module';
import EscrowModule from './escrow/escrow.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
    useFactory: getDatabaseConfig
    }), 
    UserModule, 
    TransactionModule, 
    EscrowModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

