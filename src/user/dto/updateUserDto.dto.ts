import { IsString, IsUrl } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsUrl()
  avatar: string;
}
