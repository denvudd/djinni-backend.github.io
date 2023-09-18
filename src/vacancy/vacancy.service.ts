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
      salaryForkGte: salary_min,
      salaryForkLte: salary_max,
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
    const { employer, ...rest } = await this.prismaService.vacancy.findUnique({
      where: {
        id,
      },
      include: {
        keywords: true,
        clarifiedData: true,
        employer: {
          select: {
            id: true,
            companyLink: true,
            dou: true,
            fullname: true,
            positionAndCompany: true,
            aboutCompany: true,
            user: {
              select: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    return {
      ...rest,
      employer: {
        id: employer.id,
        companyLink: employer.companyLink,
        aboutCompany: employer.aboutCompany,
        dou: employer.dou,
        fullname: employer.fullname,
        positionAndCompany: employer.positionAndCompany,
        avatar: employer.user[0].avatar,
      },
    };
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

  async addToDraft(id: string) {
    return await this.prismaService.vacancy.update({
      where: {
        id,
      },
      data: {
        active: false,
      },
    });
  }

  async removeFromDraft(id: string) {
    return await this.prismaService.vacancy.update({
      where: {
        id,
      },
      data: {
        active: true,
      },
    });
  }

  async getDrafts(id: string) {
    return await this.prismaService.vacancy.findMany({
      where: {
        employerId: id,
        active: false,
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} vacancy`;
  // }
}
