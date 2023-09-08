import { IsString, IsEnum, IsDecimal, IsOptional } from 'class-validator';
import {
  CommunicateMethod,
  EmploymentOption,
  EnglishLevel,
  PreferableLanguage,
} from 'src/enums/candidate.enum';

export class CandidateUpdateDto {
  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsDecimal()
  experience: number;

  @IsOptional()
  @IsDecimal()
  expectations: number;

  @IsOptional()
  @IsDecimal()
  hourlyRate: number;

  @IsOptional()
  @IsString()
  position: string;

  @IsOptional()
  @IsString()
  country: string;

  @IsOptional()
  @IsString()
  experienceDescr: string;

  @IsOptional()
  @IsString()
  expectationsDescr: string;

  @IsOptional()
  @IsString()
  achievementsDescr: string;

  @IsOptional()
  @IsString()
  employerQuestions: string;

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
