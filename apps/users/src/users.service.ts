import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import bcrypt from 'bcrypt';
import { User, UserDocument } from './schemas/user.schema';
import {
  CreateUserDto,
  LoginUserDto,
  UserResponseDto,
  UpdateUserDto,
} from '@app/contracts/users';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  /**
   * Register a new user
   */
  async register(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, password, firstName, lastName, phone, age, address } =
      createUserDto;

    // Check if user already exists
    const existingUser = await this.userModel.findOne({
      email: email.toLowerCase(),
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await this.userModel.create({
      email: email.toLowerCase(),
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      age,
      address,
    });

    return this.mapUserToResponse(newUser);
  }

  /**
   * Login user with email and password
   */
  async login(loginUserDto: LoginUserDto): Promise<UserResponseDto> {
    const { email, password } = loginUserDto;

    // Find user by email
    const user = await this.userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    if (!user.isActive) {
      throw new UnauthorizedException('User account is inactive');
    }

    return this.mapUserToResponse(user);
  }

  /**
   * Get user by ID
   */
  async getUserById(userId: string): Promise<UserResponseDto> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.mapUserToResponse(user);
  }

  /**
   * Get user by email
   */
  async getUserByEmail(email: string): Promise<UserResponseDto> {
    const user = await this.userModel.findOne({ email: email.toLowerCase() });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.mapUserToResponse(user);
  }

  /**
   * Update user
   */
  async updateUser(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserResponseDto> {
    const updateData: any = {};

    if (updateUserDto.firstName) updateData.firstName = updateUserDto.firstName;
    if (updateUserDto.lastName) updateData.lastName = updateUserDto.lastName;
    if (updateUserDto.phone) updateData.phone = updateUserDto.phone;
    if (updateUserDto.age) updateData.age = updateUserDto.age;
    if (updateUserDto.address) updateData.address = updateUserDto.address;
    if (updateUserDto.password) {
      updateData.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    updateData.updatedAt = new Date();

    const user = await this.userModel.findByIdAndUpdate(userId, updateData, {
      new: true,
    });
    if (!user) {
      throw new BadRequestException('User not found');
    }
    return this.mapUserToResponse(user);
  }

  /**
   * Delete user
   */
  async deleteUser(userId: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(userId);
    if (!result) {
      throw new BadRequestException('User not found');
    }
  }

  /**
   * Get all users
   */
  async getAllUsers(): Promise<UserResponseDto[]> {
    const users = await this.userModel.find();
    return users.map((user) => this.mapUserToResponse(user));
  }

  /**
   * Verify user password
   */
  async verifyPassword(userId: string, password: string): Promise<boolean> {
    const user = await this.userModel.findById(userId);
    if (!user) {
      return false;
    }
    return bcrypt.compare(password, user.password);
  }

  /**
   * Map user document to response DTO
   */
  private mapUserToResponse(user: UserDocument): UserResponseDto {
    return {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
