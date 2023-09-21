import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class ReplyOfferDto {
  @IsString()
  @MinLength(30)
  @MaxLength(5000)
  text: string;

  @IsString()
  authorId: string; // NOTE: this is user id NOT the employer/candidate id

  @IsOptional()
  @IsString()
  replyToId: string;
}
