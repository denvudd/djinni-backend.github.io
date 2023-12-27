import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsSalaryQueryDto } from './dto/stastics-salary';
import { StatisticsMarketQueryDto } from './dto/statistics-market';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get('salaries')
  async getSalaries(@Query() queryParams: StatisticsSalaryQueryDto) {
    return await this.statisticsService.getSalaries(queryParams);
  }

  @Get('market')
  async getMarket(@Query() queryParams: StatisticsMarketQueryDto) {
    return await this.statisticsService.getMarket(queryParams);
  }
}
