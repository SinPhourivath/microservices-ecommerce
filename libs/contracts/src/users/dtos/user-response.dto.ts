export class UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  age?: number;
  address?: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}
