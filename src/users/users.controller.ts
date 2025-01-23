import { Controller, Post, Get, Put, Param, Body, Res, HttpStatus } from '@nestjs/common';
import { UserService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './users.dto';

// @UseGuards(JwtAuthGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUsers() {
    return this.userService.findUsers();
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto, @Res() res) {
    const user = await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.ACCEPTED).json({message: "User created successfully.", user});
  }

  @Put(':name')
  async updateUser(@Param('name') name: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(name, updateUserDto);
  }

  @Get(':name')
  async getUser(@Param('name') name: string) {
    return this.userService.findUser(name);
  }

  @Put("/addFunds/:userId")
  async addFunds(@Param('userId') userId: string, @Body() {amount}) {
    return this.userService.addFundstoWallet(userId, amount);
  }

  @Get("/balance/:userId")
  async getBalance(@Param('userId') userId: string) {
    return this.userService.getBalance(userId);
  }

}
