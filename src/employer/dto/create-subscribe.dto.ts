import { EmploymentOption, EnglishLevel } from '@prisma/client';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubscribeDto {
  @IsString()
  category: string;

  @IsNumber()
  experience: number;

  @IsNumber()
  @IsOptional()
  salaryForkGte: number;

  @IsNumber()
  @IsOptional()
  salaryForkLte: number;

  @IsOptional()
  @IsEnum(EnglishLevel, { message: 'Invalid english level method option' })
  english: EnglishLevel;

  @IsOptional()
  @IsEnum(EmploymentOption, { message: 'Invalid employment option' })
  employmentOptions: EmploymentOption;

  @IsString()
  @IsOptional()
  locate: string;

  @IsString()
  @IsOptional()
  keywords: string;
}
