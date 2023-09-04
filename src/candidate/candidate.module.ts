import { Module } from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateController } from './candidate.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SkillService } from 'src/skill/skill.service';

@Module({
  providers: [CandidateService, PrismaService, JwtService, SkillService],
  controllers: [CandidateController],
})
export class CandidateModule {}
