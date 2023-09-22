import { IsString } from 'class-validator';
export class MoveOfferToArchiveDto {
  @IsString()
  candidateId: string;
}
