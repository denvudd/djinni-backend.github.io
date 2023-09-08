import { IsOptional, IsString } from 'class-validator';

export class ReplyOfferDto {
  @IsString()
  text: string;

  @IsString()
  authorId: string;

  @IsOptional()
  @IsString()
  replyToId: string;
}
