import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { OfferService } from 'src/offer/offer.service';

@Module({
  providers: [CandidateService, PrismaService, JwtService, OfferService],
  controllers: [CandidateController],
})
export class CandidateModule {}
