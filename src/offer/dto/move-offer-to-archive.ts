import { IsString } from 'class-validator';

export class MoveOfferToArchiveDto {
  @IsString()
  employerId: string;

  @IsString()
  candidateId: string;
}
