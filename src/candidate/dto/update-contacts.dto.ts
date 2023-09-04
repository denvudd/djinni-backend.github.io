import {
  IsOptional,
  IsPhoneNumber,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class UpdateContactsDto {
  @IsString()
  @IsUUID()
  contactsId: string;

  @IsOptional()
  @IsString()
  skype: string;

  @IsOptional()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsOptional()
  @IsString()
  telegram: string;

  @IsOptional()
  @IsString()
  whatsApp: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  linkedIn: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  github: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  portfolio: string;

  @IsOptional()
  @IsString()
  @IsUrl()
  resumeFile: string;
}
