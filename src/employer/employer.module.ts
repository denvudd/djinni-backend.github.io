import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';

@Module({
  controllers: [EmployerController],
  providers: [EmployerService],
})
export class EmployerModule {}
