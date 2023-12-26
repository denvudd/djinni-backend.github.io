import { RefusalReason } from '@prisma/client';
import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';

export class RefuseOfferDto {
  @IsString()
  candidateId: string;

  @IsEnum(RefusalReason, { message: 'Ivalid refusal reason option' })
  reason: RefusalReason;

  @IsString()
  @MinLength(30)
  @MaxLength(5000)
  message: string;
}
