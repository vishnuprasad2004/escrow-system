import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { getDatabaseConfig } from './config/db.config';
import UserModule from './users/user.module';
import TransactionModule from './transactions/transactions.module';
import EscrowModule from './escrow/escrow.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
    useFactory: getDatabaseConfig
    }), 
    UserModule, 
    TransactionModule, 
    EscrowModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

