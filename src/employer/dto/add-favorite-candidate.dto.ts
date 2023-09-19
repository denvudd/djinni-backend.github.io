import { IsString } from 'class-validator';

export class AddFavoriteCandidateDto {
  @IsString()
  candidateId: string;
}
