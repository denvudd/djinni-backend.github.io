import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { toLowerCase, toNumber } from '../../common/helper/cast.helper';
import { ApiProperty } from '@nestjs/swagger/dist';
import { EmploymentOption, EnglishLevel } from 'src/enums/candidate.enum';
import { CompanyType } from '@prisma/client';

enum ExpRank {
  Junior = 'Junior',
  Middle = 'Middle',
  Senior = 'Senior',
  TeamLead = 'Team Lead',
  Chief = 'Chief / Head of',
}

export class VacanciesListQueryDto {
  @ApiProperty({
    description: 'page number for request',
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  page: number = 1;

  @ApiProperty({
    description: 'number of records in a request',
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  limit: number = 10;

  @ApiProperty({
    description: 'number of experience (min) of vacancy',
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  exp_level: number;

  @ApiProperty({
    description: 'experience level of vacancy',
    required: false,
    enum: ExpRank,
  })
  @Transform(({ value }) => toLowerCase(value))
  @IsOptional()
  exp_rank: ExpRank;

  @ApiProperty({
    description: 'number of salary (min) of vacancy',
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  salary: number;

  @ApiProperty({
    description: 'category of vacancy',
    required: false,
  })
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'city of vacancy',
    required: false,
  })
  @IsOptional()
  location: string;

  @ApiProperty({
    description: 'keywords for search of vacancy',
    required: false,
  })
  @Transform(({ value }) => toLowerCase(value))
  @IsOptional()
  primary_keyword: string;

  @ApiProperty({
    description: 'english level of vacancy',
    required: false,
    enum: EnglishLevel,
  })
  @IsOptional()
  english_level: EnglishLevel;

  @ApiProperty({
    description: 'preferable employment options of vacancy',
    required: false,
    enum: EmploymentOption,
  })
  @IsOptional()
  employment_options: EmploymentOption;

  @ApiProperty({
    description: 'company type of vacancy',
    required: false,
    enum: CompanyType,
  })
  @IsOptional()
  company_type: CompanyType;
}
