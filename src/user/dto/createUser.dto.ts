import { IsString, IsEmail, IsEnum } from 'class-validator';

enum UserRole {
  Employer = 'Employer',
  Candidate = 'Candidate',
}

export class CreateUserDto {
  @IsEmail(undefined, { message: 'Invalid email format' })
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole, { message: 'Invalid role' })
  role: UserRole;
}
