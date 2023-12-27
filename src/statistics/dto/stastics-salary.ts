import { ApiProperty } from '@nestjs/swagger';
import { EnglishLevel } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum StatisticPeriod {
  Last30 = 'last30',
  Last180 = 'last180',
}

export class StatisticsSalaryQueryDto {
  @ApiProperty({
    description: 'category',
    required: false,
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    description: 'experience level',
    required: false,
  })
  @IsString()
  @IsOptional()
  exp?: string;

  @ApiProperty({
    description: 'is remote or not',
    required: false,
  })
  @IsString()
  @IsOptional()
  remote?: string;

  @ApiProperty({
    description: 'selected for last time. available from 30 days and 180 days',
    required: false,
  })
  @IsEnum(StatisticPeriod, { message: 'Invalid period option' })
  @IsOptional()
  period?: StatisticPeriod;

  @ApiProperty({
    description: 'english level',
    required: false,
  })
  @IsEnum(EnglishLevel, { message: 'Invalid english level option' })
  @IsOptional()
  english_level: EnglishLevel;

  @ApiProperty({
    description: 'city, location',
    required: false,
  })
  @IsOptional()
  location?: string;
}
