import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  LoginUserDto,
  UserResponseDto,
  UpdateUserDto,
} from '@app/contracts/users';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Message Pattern: users.register
   * Register a new user
   */
  @MessagePattern('users.register')
  async register(
    @Payload() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.register(createUserDto);
  }

  /**
   * Message Pattern: users.login
   * Login user with email and password
   */
  @MessagePattern('users.login')
  async login(@Payload() loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    return this.usersService.login(loginUserDto);
  }

  /**
   * Message Pattern: users.getAll
   * Get all users
   */
  @MessagePattern('users.getAll')
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.usersService.getAllUsers();
  }

  /**
   * Message Pattern: users.getById
   * Get user by ID
   */
  @MessagePattern('users.getById')
  async getUserById(
    @Payload() payload: { userId: string },
  ): Promise<UserResponseDto> {
    return this.usersService.getUserById(payload.userId);
  }

  /**
   * Message Pattern: users.getByEmail
   * Get user by email
   */
  @MessagePattern('users.getByEmail')
  async getUserByEmail(
    @Payload() payload: { email: string },
  ): Promise<UserResponseDto> {
    return this.usersService.getUserByEmail(payload.email);
  }

  /**
   * Message Pattern: users.update
   * Update user information
   */
  @MessagePattern('users.update')
  async updateUser(
    @Payload() payload: { userId: string; data: UpdateUserDto },
  ): Promise<UserResponseDto> {
    return this.usersService.updateUser(payload.userId, payload.data);
  }

  /**
   * Message Pattern: users.delete
   * Delete user
   */
  @MessagePattern('users.delete')
  async deleteUser(
    @Payload() payload: { userId: string },
  ): Promise<{ message: string }> {
    await this.usersService.deleteUser(payload.userId);
    return { message: 'User deleted successfully' };
  }

  /**
   * Message Pattern: users.verifyPassword
   * Verify user password
   */
  @MessagePattern('users.verifyPassword')
  async verifyPassword(
    @Payload() payload: { userId: string; password: string },
  ): Promise<{ isValid: boolean }> {
    const isValid = await this.usersService.verifyPassword(
      payload.userId,
      payload.password,
    );
    return { isValid };
  }
}
