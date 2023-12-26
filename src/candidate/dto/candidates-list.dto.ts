import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { toLowerCase, toNumber } from '../../common/helper/cast.helper';
import { ApiProperty } from '@nestjs/swagger/dist';
import { EmploymentOption, EnglishLevel } from '../../enums/candidate.enum';

export class CadidatesListQueryDto {
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
    description: 'number of experience (min) of candidate',
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  exp_from: number;

  @ApiProperty({
    description: 'number of experience (max) of candidate',
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  exp_to: number;

  @ApiProperty({
    description: 'number of salary (min) of candidate',
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  salary_min: number;

  @ApiProperty({
    description: 'number of salary (max) of candidate',
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  salary_max: number;

  @ApiProperty({
    description: 'city where candidate from',
    required: false,
  })
  @Transform(({ value }) => toLowerCase(value))
  @IsOptional()
  location: string;

  @ApiProperty({
    description: 'title for categories of candidate',
    required: false,
  })
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'keywords for search of candidate',
    required: false,
  })
  @Transform(({ value }) => toLowerCase(value))
  @IsOptional()
  keywords: string;

  @ApiProperty({
    description: 'english level of candidate',
    required: false,
    enum: EnglishLevel,
  })
  @IsOptional()
  english_level: EnglishLevel;

  @ApiProperty({
    description: 'preferable employment options of candidate',
    required: false,
    enum: EmploymentOption,
  })
  @IsOptional()
  employment_options: EmploymentOption;
}
