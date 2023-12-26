import { Module } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [VacancyController],
  providers: [VacancyService, PrismaService, JwtService],
})
export class VacancyModule {}
