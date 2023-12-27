import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  StatisticPeriod,
  StatisticsSalaryQueryDto,
} from './dto/stastics-salary';
import { EmploymentOption, Prisma } from '@prisma/client';
import { StatisticsMarketQueryDto } from './dto/statistics-market';
import { filter } from 'rxjs';

@Injectable()
export class StatisticsService {
  constructor(private prisma: PrismaService) {}

  async getSalaries(queryParams: StatisticsSalaryQueryDto) {
    const { english_level, exp, location, period, remote, title } = queryParams;

    const candidateFilter: Prisma.CandidateUserWhereInput = {
      experience: exp ? Number(exp) : undefined,
      createdAt:
        period === StatisticPeriod.Last30
          ? { gte: new Date(Date.now() - 2592000000) }
          : { gte: new Date(Date.now() - 15552000000) },
      active: true,
      filled: true,
    };
    const vacancyFilter: Prisma.VacancyWhereInput = {
      experience: exp ? Number(exp) : undefined,
      createdAt:
        period === StatisticPeriod.Last30
          ? { gte: new Date(Date.now() - 2592000000) }
          : { gte: new Date(Date.now() - 15552000000) },
    };

    if (title) {
      candidateFilter.category = title;
      vacancyFilter.category = title;
    }

    if (location) {
      candidateFilter.city = location;
      vacancyFilter.city = location;
    }

    if (english_level) {
      candidateFilter.english = english_level;
      vacancyFilter.english = english_level;
    }

    if (remote) {
      candidateFilter.employmentOptions = EmploymentOption.Remote;
      vacancyFilter.employmentOptions = EmploymentOption.Remote;
    }

    // I use Promise.all() here because according to Prisma's documentation $transaction executes sequentially
    // documentation: https://www.prisma.io/docs/concepts/components/prisma-client/transactions#about-transactions-in-prisma
    // relative issue: https://github.com/prisma/prisma/issues/7550#issuecomment-1594572700
    const [candidates, vacancies] = await Promise.all([
      this.prisma.candidateUser.aggregate({
        where: candidateFilter,
        _count: true,
        _sum: {
          expectations: true,
        },
        _avg: {
          expectations: true,
        },
        _min: {
          expectations: true,
        },
        _max: {
          expectations: true,
        },
      }),
      this.prisma.vacancy.aggregate({
        where: vacancyFilter,
        _count: true,
        _sum: {
          privateSalaryForkGte: true,
        },
        _avg: {
          salaryForkGte: true,
        },
        _min: {
          salaryForkGte: true,
        },
        _max: {
          salaryForkGte: true,
        },
      }),
    ]);

    return {
      candidates: {
        count: candidates._count,
        totalSum: candidates._sum.expectations,
        fork: {
          avg: Math.round(candidates._avg.expectations),
          min: candidates._min.expectations,
          max: candidates._max.expectations,
        },
      },
      vacancies: {
        count: vacancies._count,
        totalSum: vacancies._sum.privateSalaryForkGte,
        fork: {
          avg: Math.round(vacancies._avg.salaryForkGte),
          min: vacancies._min.salaryForkGte,
          max: vacancies._max.salaryForkGte,
        },
      },
      graphData: [
        {
          name: 'Minimum',
          candidates: candidates._min.expectations,
          vacancies: vacancies._min.salaryForkGte,
        },
        {
          name: 'Average',
          candidates: Math.round(candidates._avg.expectations),
          vacancies: Math.round(vacancies._avg.salaryForkGte),
        },
        {
          name: 'Maximum',
          candidates: candidates._max.expectations,
          vacancies: vacancies._max.salaryForkGte,
        },
      ],
    };
  }

  async getMarket(queryParams: StatisticsMarketQueryDto) {
    const { exp, title } = queryParams;

    const candidateFilter: Prisma.CandidateUserWhereInput = {
      experience: exp ? Number(exp) : undefined,
      active: true,
      filled: true,
    };
    const vacancyFilter: Prisma.VacancyWhereInput = {
      experience: exp ? Number(exp) : undefined,
    };

    if (title) {
      candidateFilter.category = title;
      vacancyFilter.category = title;
    }

    // I use Promise.all() here because according to Prisma's documentation $transaction executes sequentially
    // documentation: https://www.prisma.io/docs/concepts/components/prisma-client/transactions#about-transactions-in-prisma
    // relative issue: https://github.com/prisma/prisma/issues/7550#issuecomment-1594572700
    const [candidates, vacancies, candidatesCount, vacanciesCount] =
      await Promise.all([
        this.prisma.candidateUser.findMany({
          where: candidateFilter,
          select: {
            _count: {
              select: {
                user: true,
              },
            },
            createdAt: true,
          },
        }),
        this.prisma.vacancy.findMany({
          where: vacancyFilter,
          select: {
            _count: {
              select: {
                clarifiedData: true,
              },
            },
            createdAt: true,
          },
        }),
        this.prisma.candidateUser.count({
          where: candidateFilter,
        }),
        this.prisma.vacancy.count({
          where: vacancyFilter,
        }),
      ]);

    type T = { [key: number]: number };
    const candidateMonthlyRevenue: T = {};
    const vacancyMonthlyRevenue: T = {};

    for (const candidate of candidates) {
      const month = candidate.createdAt.getMonth();

      candidateMonthlyRevenue[month] =
        (candidateMonthlyRevenue[month] || 0) + 1;
    }

    for (const vacancy of vacancies) {
      const month = vacancy.createdAt.getMonth();

      vacancyMonthlyRevenue[month] = (vacancyMonthlyRevenue[month] || 0) + 1;
    }

    const graphData = [
      { name: 'Jan', candidateTotal: 0, vacancyTotal: 0 },
      { name: 'Feb', candidateTotal: 0, vacancyTotal: 0 },
      { name: 'Mar', candidateTotal: 0, vacancyTotal: 0 },
      { name: 'May', candidateTotal: 0, vacancyTotal: 0 },
      { name: 'Jun', candidateTotal: 0, vacancyTotal: 0 },
      { name: 'Jul', candidateTotal: 0, vacancyTotal: 0 },
      { name: 'Aug', candidateTotal: 0, vacancyTotal: 0 },
      { name: 'Sep', candidateTotal: 0, vacancyTotal: 0 },
      { name: 'Oct', candidateTotal: 0, vacancyTotal: 0 },
      { name: 'Nov', candidateTotal: 0, vacancyTotal: 0 },
      { name: 'Dec', candidateTotal: 0, vacancyTotal: 0 },
    ];

    for (const month in candidateMonthlyRevenue) {
      graphData[parseInt(month)].candidateTotal =
        candidateMonthlyRevenue[parseInt(month)];
    }

    for (const month in vacancyMonthlyRevenue) {
      graphData[parseInt(month)].vacancyTotal =
        vacancyMonthlyRevenue[parseInt(month)];
    }

    return {
      djinniIndex: candidatesCount / vacanciesCount,
      graphData,
    };
  }
}
