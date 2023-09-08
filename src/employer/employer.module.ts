import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { OfferService } from 'src/offer/offer.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EmployerController],
  providers: [EmployerService, PrismaService, JwtService, OfferService],
})
export class EmployerModule {}
