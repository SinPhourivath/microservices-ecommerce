import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UsersService } from './users.service';
import {
  CreateUserDto,
  LoginUserDto,
  UpdateUserDto,
  UserResponseDto,
} from '@app/contracts/users';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // ============================================
  // PUBLIC ROUTES (No JWT required)
  // ============================================

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    return this.usersService.register(createUserDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    return this.usersService.login(loginUserDto);
  }

  // ============================================
  // PROTECTED ROUTES (JWT required)
  // ============================================

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req): Promise<UserResponseDto> {
    return this.usersService.getUserById(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('search/email')
  async getUserByEmail(
    @Query('email') email: string,
  ): Promise<UserResponseDto> {
    if (!email) {
      throw new BadRequestException('Email query parameter is required');
    }
    return this.usersService.getUserByEmail(email);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(): Promise<UserResponseDto[]> {
    return this.usersService.getAllUsers();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id') userId: string): Promise<UserResponseDto> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }
    return this.usersService.getUserById(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ): Promise<UserResponseDto> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (userId !== req.user.userId) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return this.usersService.updateUser(userId, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(
    @Param('id') userId: string,
    @Request() req,
  ): Promise<{ message: string }> {
    if (!userId) {
      throw new BadRequestException('User ID is required');
    }

    if (userId !== req.user.userId) {
      throw new ForbiddenException('You can only delete your own profile');
    }
    return this.usersService.deleteUser(userId);
  }
}
