import {
  IsArray,
  IsBoolean,
  IsDecimal,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

enum EmploymentOption {
  Remote = 'Remote',
  Office = 'Office',
  PartTime = 'PartTime',
  Freelance = 'Freelance',
  RelocateCity = 'RelocateCity',
  RelocateCountry = 'RelocateCountry',
}

enum EnglishLevel {
  NoEnglish = 'NoEnglish',
  BeginnerElementary = 'BeginnerElementary',
  PreIntermediate = 'PreIntermediate',
  Intermediate = 'Intermediate',
  UpperIntermediate = 'UpperIntermediate',
  AdvancedFluent = 'AdvancedFluent',
}

enum CompanyType {
  None = 'None',
  Product = 'Product',
  Outsource = 'Outsource',
  Outstaff = 'Outstaff',
  Agency = 'Agency',
}

enum ClarifiedDataEnum {
  None = 'None',
  Part_time = 'Part_time',
  Test_task = 'Test_task',
  Cover_letter = 'Cover_letter',
}

export class CreateVacancyDto {
  @IsString()
  employerId: string;

  @IsString()
  name: string;

  @IsString()
  domain: string;

  @IsString()
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

  @IsDecimal()
  salaryFork: number;

  @IsOptional()
  @IsDecimal()
  privateSalaryFork: number;

  @IsDecimal()
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
