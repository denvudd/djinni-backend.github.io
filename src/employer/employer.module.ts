import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { EmployerController } from './employer.controller';
import { EmployerService } from './employer.service';
import { OfferService } from '../offer/offer.service';
import { PrismaService } from '../prisma.service';
import { VacancyService } from '../vacancy/vacancy.service';

@Module({
  controllers: [EmployerController],
  providers: [
    EmployerService,
    PrismaService,
    JwtService,
    OfferService,
    VacancyService,
  ],
})
export class EmployerModule {}
