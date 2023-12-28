import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
import { toNumber } from '../../common/helper/cast.helper';
import { ApiProperty } from '@nestjs/swagger/dist';

export class VacanciesByProfileQueryDto {
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
}
