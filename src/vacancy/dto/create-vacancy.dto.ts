import { EmploymentOption, EnglishLevel } from '@prisma/client';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

enum CompanyType {
  None = 'None',
  Product = 'Product',
  Outsource = 'Outsource',
  Outstaff = 'Outstaff',
  Agency = 'Agency',
}

export enum ClarifiedDataEnum {
  None = 'None',
  Part_time = 'Part_time',
  Test_task = 'Test_task',
  Cover_letter = 'Cover_letter',
}

export class CreateVacancyDto {
  @IsString()
  employerId: string;

  @IsBoolean()
  active: boolean;

  @IsString()
  name: string;

  @IsString()
  domain: string;

  @IsString()
  @MinLength(300, {
    message: 'Description must be more than 300 characters',
  })
  @MaxLength(14000, {
    message: 'Description must be less than 14000 characters',
  })
  description: string;

  @IsOptional()
  @IsString()
  youtube: string;

  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsBoolean()
  isRelocate: boolean;

  @IsOptional()
  @IsNumber()
  salaryForkGte: number;

  @IsOptional()
  @IsNumber()
  salaryForkLte: number;

  @IsNumber()
  privateSalaryForkGte: number;

  @IsNumber()
  privateSalaryForkLte: number;

  @IsNumber()
  experience: number;

  @IsOptional()
  @IsEnum(EnglishLevel, { message: 'Invalid english level method option' })
  english: EnglishLevel;

  @IsEnum(EmploymentOption, { message: 'Invalid employment option' })
  employmentOptions: EmploymentOption;

  @IsEnum(CompanyType, { message: 'Invalid company type option' })
  companyType: CompanyType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  clarifiedData: Array<ClarifiedDataEnum>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords: Array<string>;
}
