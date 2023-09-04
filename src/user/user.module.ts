import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { CandidateService } from 'src/candidate/candidate.service';

@Module({
  providers: [UserService, PrismaService, JwtService, CandidateService],
  controllers: [UserController],
})
export class UserModule {}
