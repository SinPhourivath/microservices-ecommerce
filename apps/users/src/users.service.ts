import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import {
  CreateUserDto,
  LoginUserDto,
  UserResponseDto,
  UpdateUserDto,
  User,
  UserDocument,
} from '@app/contracts/users';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

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

    // Generate JWT token
    const token = this.generateToken(newUser);

    return this.mapUserToResponse(newUser, token);
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

    // Generate JWT token
    const token = this.generateToken(user);

    return this.mapUserToResponse(user, token);
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
    const updateData: Partial<User> = {};

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
   * Generate JWT token for user
   */
  private generateToken(user: UserDocument): string {
    const payload = { email: user.email, sub: user._id.toString() };
    return this.jwtService.sign(payload);
  }

  /**
   * Map user document to response DTO
   */
  private mapUserToResponse(
    user: UserDocument,
    token?: string,
  ): UserResponseDto {
    return {
      id: user._id.toString(),
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phone: user.phone,
      age: user.age,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      token,
    };
  }
}
