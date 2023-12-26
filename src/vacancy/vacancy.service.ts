import { Injectable, NotFoundException } from '@nestjs/common';
import { ClarifiedDataEnum, CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacanciesListQueryDto } from './dto/vacancies-list.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable()
export class VacancyService {
  constructor(private prismaService: PrismaService) {}

  private async checkVacancyExist(id: string) {
    return await this.prismaService.vacancy.findUnique({
      where: {
        id,
      },
    });
  }

  async getListOfVacancies(queryParams: VacanciesListQueryDto) {
    const {
      company_type,
      employment_options,
      english_level,
      exp_level,
      limit,
      page,
      primary_keyword,
      salary,
      title,
      location,
      exp_rank,
    } = queryParams;

    const filter: Prisma.VacancyWhereInput = {
      experience: exp_level,
      salaryForkGte: {
        gte: salary,
      },
      active: true,
    };

    if (title) {
      filter.category = title;
    }

    if (location) {
      filter.city = location;
    }

    if (primary_keyword || exp_rank) {
      filter.OR = [
        { name: { contains: primary_keyword || exp_rank } },
        { description: { contains: primary_keyword || exp_rank } },
      ];
    }

    if (company_type) {
      filter.companyType = company_type;
    }

    if (english_level) {
      filter.english = english_level;
    }

    if (employment_options) {
      filter.employmentOptions = employment_options;
    }

    // I use Promise.all() here because according to Prisma's documentation $transaction executes sequentially
    // documentation: https://www.prisma.io/docs/concepts/components/prisma-client/transactions#about-transactions-in-prisma
    // relative issue: https://github.com/prisma/prisma/issues/7550#issuecomment-1594572700
    const [vacancies, count] = await Promise.all([
      this.prismaService.vacancy.findMany({
        where: filter,
        select: {
          favoriteVacancies: {
            select: {
              id: true,
              candidateId: true,
              vacancyId: true,
            },
          },
          employer: {
            select: {
              id: true,
              fullname: true,
              positionAndCompany: true,
              user: {
                select: {
                  avatar: true,
                },
              },
            },
          },
          id: true,
          name: true,
          companyType: true,
          createdAt: true,
          responsesCount: true,
          views: true,
          country: true,
          city: true,
          employmentOptions: true,
          experience: true,
          english: true,
          salaryForkGte: true,
          salaryForkLte: true,
          description: true,
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [
          {
            experience: 'desc',
          },
          {
            updatedAt: 'asc',
          },
        ],
      }),
      this.prismaService.vacancy.count({
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      vacancies,
      count,
    };
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

    if (!rest) throw new NotFoundException('This vacancy is not exists.');

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

  async findOneByIdPublic(id: string) {
    const vacancyExist = await this.checkVacancyExist(id);

    if (!vacancyExist)
      throw new NotFoundException('This vacancy is not exists.');

    const { employer, ...rest } = await this.prismaService.vacancy.update({
      where: {
        id,
      },
      data: {
        views: vacancyExist.views + 1,
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

  async getDrafts(id: string) {
    return await this.prismaService.vacancy.findMany({
      where: {
        employerId: id,
        active: false,
      },
    });
  }

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

  async update(id: string, updateVacancyDto: UpdateVacancyDto) {
    const {
      employerId,
      clarifiedData: newClarifiedData,
      keywords: newKeywords,
      ...rest
    } = updateVacancyDto;

    const existingVacancy = await this.prismaService.vacancy.findUnique({
      where: {
        id,
      },
      select: {
        keywords: {
          select: {
            name: true,
            vacancyId: true,
          },
        },
        clarifiedData: {
          select: {
            name: true,
            vacancyId: true,
          },
        },
      },
    });

    const currentKeywords = existingVacancy.keywords.map(
      (keyword) => keyword.name,
    );

    const keywordsToDelete = currentKeywords.filter(
      (keyword) => !newKeywords.includes(keyword),
    );

    const keywordsToCreate = newKeywords.filter(
      (keyword) => !currentKeywords.includes(keyword),
    );

    const currentClarifiedData = existingVacancy.clarifiedData.map(
      (data) => data.name as ClarifiedDataEnum,
    );

    const clarifiedDataToDelete = currentClarifiedData.filter(
      (data) => !newClarifiedData.includes(data),
    );

    const clarifiedDataToCreate = newClarifiedData.filter(
      (data) => !currentClarifiedData.includes(data),
    );

    const updatedVacancy = await this.prismaService.vacancy.update({
      where: {
        id,
      },
      data: {
        clarifiedData: {
          deleteMany: clarifiedDataToDelete.map((name) => ({
            name,
          })),
          create: clarifiedDataToCreate.map((name) => ({
            name,
          })),
        },
        keywords: {
          deleteMany: keywordsToDelete.map((name) => ({
            name,
            vacancyId: id,
          })),
          create: keywordsToCreate.map((name) => ({
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

    return updatedVacancy;
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

  // remove(id: number) {
  //   return `This action removes a #${id} vacancy`;
  // }
}
