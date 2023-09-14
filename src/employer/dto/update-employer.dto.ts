import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateEmployerDto {
  @IsOptional()
  @IsBoolean()
  filled: boolean;

  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  companyName: string;

  @IsOptional()
  @IsString()
  positionAndCompany: string;

  @IsOptional()
  @IsString()
  telegram: string;

  @IsOptional()
  @IsString()
  linkedIn: string;

  @IsOptional()
  @IsString()
  companyLink: string;

  @IsOptional()
  @IsString()
  dou: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  aboutCompany: string;
}
