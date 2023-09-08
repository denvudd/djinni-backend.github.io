import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { toLowerCase, toNumber } from '../../common/helper/cast.helper';
import { ApiProperty } from '@nestjs/swagger/dist';
import { EmploymentOption, EnglishLevel } from 'src/enums/candidate.enum';

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
  exp_from: number;

  @ApiProperty({
    description: 'number of experience (max) of vacancy',
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  exp_to: number;

  @ApiProperty({
    description: 'number of salary (min) of vacancy',
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  salary_min: number;

  @ApiProperty({
    description: 'number of salary (max) of vacancy',
    required: false,
  })
  @Transform(({ value }) => toNumber(value, { default: 1, min: 1 }))
  @IsNumber()
  @IsOptional()
  salary_max: number;

  @ApiProperty({
    description: 'title for categories of vacancy',
    required: false,
  })
  @IsOptional()
  title: string;

  @ApiProperty({
    description: 'keywords for search of vacancy',
    required: false,
  })
  @Transform(({ value }) => toLowerCase(value))
  @IsOptional()
  keywords: string;

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
}
