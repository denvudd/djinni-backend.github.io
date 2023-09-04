import { IsOptional, IsString } from 'class-validator';

export class SkillCreateDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  category: string;
}
