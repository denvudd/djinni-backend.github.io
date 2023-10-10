import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateBillingDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;

  @IsString()
  country: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  firstStreet: string;

  @IsString()
  @IsOptional()
  secondStreet?: string;

  @IsString()
  city: string;

  @IsNumber()
  postalCode: number;

  @IsString()
  @IsOptional()
  vatId?: string;
}
