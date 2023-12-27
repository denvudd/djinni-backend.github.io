import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { PrismaService } from '../prisma.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [StatisticsService, PrismaService, JwtService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
