import { IsString } from 'class-validator';

export class AddFavoriteVacancyDto {
  @IsString()
  vacancyId: string;
}
