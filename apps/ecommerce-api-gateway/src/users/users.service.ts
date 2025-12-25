import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  CreateUserDto,
  LoginUserDto,
  UserResponseDto,
  UpdateUserDto,
} from '@app/contracts/users';

@Injectable()
export class UsersService {
  constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

  /**
   * Register a new user via Users microservice
   */
  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return firstValueFrom(
      this.usersClient.send('users.register', createUserDto),
    );
  }

  /**
   * Login user via Users microservice
   */
  async login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    return firstValueFrom(this.usersClient.send('users.login', loginUserDto));
  }

  /**
   * Get all users via Users microservice
   */
  async getAllUsers(): Promise<UserResponseDto[]> {
    return firstValueFrom(this.usersClient.send('users.getAll', {}));
  }

  /**
   * Get user by ID via Users microservice
   */
  async getUserById(userId: string): Promise<UserResponseDto> {
    return firstValueFrom(this.usersClient.send('users.getById', { userId }));
  }

  /**
   * Get user by email via Users microservice
   */
  async getUserByEmail(email: string): Promise<UserResponseDto> {
    return firstValueFrom(this.usersClient.send('users.getByEmail', { email }));
  }

  /**
   * Update user via Users microservice
   */
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    return firstValueFrom(
      this.usersClient.send('users.update', { userId, data: updateUserDto }),
    );
  }

  /**
   * Delete user via Users microservice
   */
  async deleteUser(userId: string): Promise<{ message: string }> {
    return firstValueFrom(this.usersClient.send('users.delete', { userId }));
  }
}
