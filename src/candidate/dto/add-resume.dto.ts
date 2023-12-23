import { IsBoolean, IsString } from 'class-validator';

export class CandidateResumeDto {
  @IsString()
  name: string;

  @IsString()
  resumeUrl: string;

  @IsBoolean()
  isMain: boolean;
}
