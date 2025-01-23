import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { CreateUserDto, UpdateUserDto } from './users.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findUsers() {
    return await this.userModel.find().populate('wallet.transactions').exec();
  }
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new this.userModel(createUserDto);
    return newUser.save();
  }

  async updateUser(name: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userModel.findOneAndUpdate({name:name}, updateUserDto, { new: true });
  }

  async findUser(name: string): Promise<User> {
    return this.userModel.findOne({name: name}).populate('wallet.transactions').exec();
  }
}
