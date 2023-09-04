import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { CandidateModule } from './candidate/candidate.module';
import { SkillModule } from './skill/skill.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, CandidateModule, SkillModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
