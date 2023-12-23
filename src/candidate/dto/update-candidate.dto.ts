import {
  IsString,
  IsEnum,
  IsOptional,
  IsNumber,
  IsBoolean,
  MaxLength,
  IsArray,
  IsObject,
} from 'class-validator';
import {
  CommunicateMethod,
  EmploymentOption,
  EnglishLevel,
  PreferableLanguage,
} from 'src/enums/candidate.enum';

export class CandidateUpdateDto {
  @IsBoolean()
  @IsOptional()
  filled: boolean;

  @IsBoolean()
  @IsOptional()
  active: boolean;

  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  skype: string;

  @IsOptional()
  @IsString()
  linkedIn: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  telegram: string;

  @IsOptional()
  @IsString()
  whatsApp: string;

  @IsOptional()
  @IsString()
  github: string;

  @IsOptional()
  @IsString()
  portfolio: string;

  @IsOptional()
  @IsBoolean()
  isRelocate: boolean;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsNumber()
  experience: number;

  @IsOptional()
  @IsNumber()
  expectations: number;

  @IsOptional()
  @IsNumber()
  hourlyRate: number;

  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  city: string;

  @IsOptional()
  @IsString()
  @MaxLength(1500)
  experienceDescr: string;

  @IsOptional()
  @IsString()
  @MaxLength(1500)
  expectationsDescr: string;

  @IsOptional()
  @IsString()
  @MaxLength(1500)
  achievementsDescr: string;

  @IsOptional()
  @IsString()
  @MaxLength(800)
  employerQuestions: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  blockedDomains: Array<string>;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  blockedTypes: Array<string>;

  @IsOptional()
  @IsEnum(EmploymentOption, { message: 'Invalid employment option' })
  employmentOptions: EmploymentOption;

  @IsOptional()
  @IsEnum(PreferableLanguage, { message: 'Invalid preferable language option' })
  preferableLang: PreferableLanguage;

  @IsOptional()
  @IsEnum(CommunicateMethod, { message: 'Invalid communicate method option' })
  communicateMethod: CommunicateMethod;

  @IsOptional()
  @IsEnum(EnglishLevel, { message: 'Invalid english level method option' })
  english: EnglishLevel;
}
