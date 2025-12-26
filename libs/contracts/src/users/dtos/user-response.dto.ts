export class UserResponseDto {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  token?: string;
  createdAt: Date;
  updatedAt: Date;
}
