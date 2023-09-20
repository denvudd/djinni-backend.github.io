import { IsOptional, IsString } from 'class-validator';

export class CreateOfferDto {
  @IsString()
  @IsOptional()
  vacancyId: string;

  @IsString()
  employerId: string;

  @IsString()
  candidateId: string;

  @IsString()
  coverLetter: string;
}
