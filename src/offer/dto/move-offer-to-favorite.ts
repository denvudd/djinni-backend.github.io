import { IsString } from 'class-validator';

export class MoveOfferToFavoriteDto {
  @IsString()
  candidateId: string;
}
