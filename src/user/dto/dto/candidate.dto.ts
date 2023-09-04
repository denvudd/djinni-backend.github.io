import { IsString, IsEnum, IsDecimal, IsOptional } from 'class-validator';

enum EmploymentOption {
  Remote = 'Remote',
  Office = 'Office',
  PartTime = 'PartTime',
  Freelance = 'Freelance',
  RelocateCity = 'RelocateCity',
  RelocateCountry = 'RelocateCountry',
}

enum PreferableLanguage {
  Ukrainian = 'Ukrainian',
  English = 'English',
}

enum CommunicateMethod {
  Djinni = 'Djinni',
  Email = 'Email',
  Phone = 'Phone',
  Skype = 'Skype',
  WhatsApp = 'WhatsApp',
  Telegram = 'Telegram',
  LinkedIn = 'LinkedIn',
}

enum EnglishLevel {
  NoEnglish = 'NoEnglish',
  BeginnerElementary = 'BeginnerElementary',
  PreIntermediate = 'PreIntermediate',
  Intermediate = 'Intermediate',
  UpperIntermediate = 'UpperIntermediate',
  AdvancedFluent = 'AdvancedFluent',
}

export class CandidateUpdateDto {
  @IsOptional()
  @IsString()
  fullname: string;

  @IsOptional()
  @IsString()
  category: string;

  @IsDecimal()
  experience: number;

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

  @IsEnum(EmploymentOption, { message: 'Invalid employment option' })
  employmentOptions: EmploymentOption;

  @IsEnum(PreferableLanguage, { message: 'Invalid preferable language option' })
  preferableLang: PreferableLanguage;

  @IsEnum(CommunicateMethod, { message: 'Invalid communicate method option' })
  communicateMethod: CommunicateMethod;

  @IsEnum(EnglishLevel, { message: 'Invalid english level method option' })
  english: EnglishLevel;
}
