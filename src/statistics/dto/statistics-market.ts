import { ApiProperty } from '@nestjs/swagger';
import { EnglishLevel } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export enum StatisticPeriod {
  Last30 = 'last30',
  Last180 = 'last180',
}

export class StatisticsMarketQueryDto {
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
}
