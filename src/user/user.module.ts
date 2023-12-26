import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
import { CandidateService } from '../candidate/candidate.service';

@Module({
  providers: [UserService, PrismaService, JwtService, CandidateService],
  controllers: [UserController],
})
export class UserModule {}
