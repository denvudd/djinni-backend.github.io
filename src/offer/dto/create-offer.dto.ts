import { IsString } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  vacancyId: string;

  @IsString()
  employerId: string;

  @IsString()
  candidateId: string;

  @IsString()
  coverLetter: string;
}
