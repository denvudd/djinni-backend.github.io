import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { OfferController } from './offer.controller';
import { OfferService } from './offer.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [OfferController],
  providers: [OfferService, PrismaService, JwtService],
})
export class OfferModule {}
