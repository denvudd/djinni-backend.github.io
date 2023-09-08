import { Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { PrismaService } from 'src/prisma.service';
import { VacanciesListQueryDto } from './dto/vacancies-list.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class VacancyService {
  constructor(private prismaService: PrismaService) {}
  async create(createVacancyDto: CreateVacancyDto) {
    const { employerId, clarifiedData, keywords, ...rest } = createVacancyDto;

    const vacancy = await this.prismaService.vacancy.create({
      data: {
        clarifiedData: {
          create: clarifiedData.map((name) => ({
            name,
          })),
        },
        keywords: {
          create: keywords.map((name) => ({
            name,
          })),
        },
        employer: {
          connect: {
            id: employerId,
          },
        },
        ...rest,
      },
      include: {
        clarifiedData: true,
        keywords: {
          select: {
            name: true,
            id: true,
          },
        },
        employer: {
          select: {
            fullname: true,
            id: true,
            positionAndCompany: true,
            companyLink: true,
            linkedIn: true,
            telegram: true,
            user: {
              select: {
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });
    return vacancy;
  }

  async getListOfVacancies(queryParams: VacanciesListQueryDto) {
    const {
      page,
      limit,
      exp_from,
      exp_to,
      salary_min,
      salary_max,
      title,
      keywords,
      english_level,
      employment_options,
    } = queryParams;

    const filter: Prisma.VacancyWhereInput = {
      experience: {
        gte: exp_from,
        lte: exp_to,
      },
      salaryFork: {
        gte: salary_min,
        lte: salary_max,
      },
    };

    if (title) {
      filter.category = title;
    }

    if (keywords) {
      filter.OR = [
        { name: { contains: keywords } },
        { description: { contains: keywords } },
      ];
    }

    if (english_level) {
      filter.english = english_level;
    }

    if (employment_options) {
      filter.employmentOptions = employment_options;
    }

    console.log(filter);

    return this.prismaService.vacancy.findMany({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOneById(id: string) {
    return await this.prismaService.vacancy.findUnique({
      where: {
        id,
      },
      include: {
        keywords: true,
        clarifiedData: true,
      },
    });
  }

  async update(id: string, updateVacancyDto: UpdateVacancyDto) {
    const { employerId, clarifiedData, keywords, ...restDto } =
      updateVacancyDto;

    return await this.prismaService.vacancy.update({
      where: {
        id,
      },
      data: {
        ...restDto,
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} vacancy`;
  // }
}
