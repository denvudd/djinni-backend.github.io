import { IsBoolean } from 'class-validator';

export class UpdateIsMainDto {
  @IsBoolean()
  isMain: boolean;
}
