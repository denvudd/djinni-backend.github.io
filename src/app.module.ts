import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CandidateModule } from './candidate/candidate.module';
import { CategoryModule } from './category/category.module';
import { VacancyModule } from './vacancy/vacancy.module';
import { EmployerModule } from './employer/employer.module';
import { CountriesModule } from './countries/countries.module';
import { OfferModule } from './offer/offer.module';

import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    CandidateModule,
    CategoryModule,
    VacancyModule,
    OfferModule,
    EmployerModule,
    CountriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
