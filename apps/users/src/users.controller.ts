import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
} from '@app/contracts/users';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @MessagePattern('users.register')
  async register(@Payload() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @MessagePattern('users.login')
  async login(@Payload() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @MessagePattern('users.getById')
  async getUserById(@Payload() data: { userId: string }) {
    return this.usersService.getUserById(data.userId);
  }

  @MessagePattern('users.getByEmail')
  async getUserByEmail(@Payload() data: { email: string }) {
    return this.usersService.getUserByEmail(data.email);
  }

  @MessagePattern('users.getAll')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @MessagePattern('users.update')
  async updateUser(@Payload() data: { userId: string; data: UpdateUserDto }) {
    return this.usersService.updateUser(data.userId, data.data);
  }

  @MessagePattern('users.delete')
  async deleteUser(@Payload() data: { userId: string }) {
    await this.usersService.deleteUser(data.userId);
    return { message: 'User deleted successfully' };
  }

  @MessagePattern('users.verifyPassword')
  async verifyPassword(@Payload() data: { userId: string; password: string }) {
    return this.usersService.verifyPassword(data.userId, data.password);
  }
}
