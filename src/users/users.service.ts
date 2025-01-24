import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { CreateUserDto, UpdateUserDto } from './users.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly jwtService: JwtService, ) {}

  async findUsers() {
    return await this.userModel.find().populate('wallet.transactions').exec();
  }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const payload = { email: createUserDto.email };
    const token = this.jwtService.sign(payload);
    const newUser = new this.userModel({...createUserDto,accessToken:token});
    return newUser.save();
  }

  async updateUser(name: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({name:name}, updateUserDto, { new: true });
  }

  async findUser(name: string): Promise<User> {
    return this.userModel.findOne({name: name}).populate('wallet.transactions').exec();
  }

  async addFundstoWallet(userId: string, amount: number) {
    const user = await this.userModel.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    user.wallet.moneyAmount += amount;
    return user.save();
  }

  async withdrawFunds(userId: string, amount: number) {
    const user = await this.userModel.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    if (user.wallet.moneyAmount < amount) throw new Error('Insufficient balance');
    user.wallet.moneyAmount -= amount;
    return user.save();
  }

  async getBalance(userId: string) {
    const user = await this.userModel.findById(userId);
    if (!user) {
        throw new Error('User not found');
    }
    return user.wallet.moneyAmount;
  }
}
