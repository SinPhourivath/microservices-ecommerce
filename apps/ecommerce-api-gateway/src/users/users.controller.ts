import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  LoginUserDto,
  UserResponseDto,
  UpdateUserDto,
} from '@app/contracts/users';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  /**
   * POST /users/register
   * Register a new user
   */
  @Post('register')
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.register(createUserDto);
  }

  /**
   * POST /users/login
   * Login user with email and password
   */
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    return this.usersService.login(loginUserDto);
  }

  /**
   * GET /users
   * Get all users
   */
  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.usersService.getAllUsers();
  }

  /**
   * GET /users/:id
   * Get user by ID
   */
  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<UserResponseDto> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.usersService.getUserById(userId);
  }

  /**
   * GET /users/search/email
   * Get user by email query parameter
   */
  @Get('search/email')
  async getUserByEmail(
    @Query('email') email: string,
  ): Promise<UserResponseDto> {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    return this.usersService.getUserByEmail(email);
  }

  /**
   * PUT /users/:id
   * Update user information
   */
  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.usersService.updateUser(userId, updateUserDto);
  }

  /**
   * DELETE /users/:id
   * Delete user
   */
  @Delete(':id')
  async deleteUser(@Param('id') userId: string): Promise<{ message: string }> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.usersService.deleteUser(userId);
  }
}
