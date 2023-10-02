import { IsString, IsUrl, ValidateIf } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsUrl()
  @ValidateIf((o) => o === null)
  avatar: string;
}
