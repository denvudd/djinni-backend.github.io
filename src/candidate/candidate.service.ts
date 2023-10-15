import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

import { CandidateUpdateDto } from './dto/update-candidate.dto';
import { SkillCreateDto } from './dto/create-skill.dto';
import { CadidatesListQueryDto } from './dto/candidates-list.dto';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  private checkCandidateExists(id: string) {
    return this.prisma.candidateUser.findUnique({
      where: {
        id,
      },
    });
  }

  async getListOfCandidates(queryParams: CadidatesListQueryDto) {
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
      location,
    } = queryParams;

    const filter: Prisma.CandidateUserWhereInput = {
      experience: {
        gte: exp_from,
        lte: exp_to,
      },
      expectations: {
        gte: salary_min,
        lte: salary_max,
      },
      filled: true,
    };

    if (title) {
      filter.category = title;
    }

    if (location) {
      filter.city = location;
    }

    if (keywords) {
      filter.OR = [
        { position: { contains: keywords } },
        { experienceDescr: { contains: keywords } },
        { expectationsDescr: { contains: keywords } },
        { achievementsDescr: { contains: keywords } },
      ];
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
    const [candidates, count] = await Promise.all([
      this.prisma.candidateUser.findMany({
        where: filter,
        include: {
          skills: true,
          favoriteCandidates: {
            select: {
              employerId: true,
              id: true,
            },
          },
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
          {
            skills: {
              _count: 'desc',
            },
          },
        ],
      }),
      this.prisma.candidateUser.count({
        where: filter,
        skip: (page - 1) * limit,
        take: limit,
      }),
    ]);

    return {
      candidates,
      count,
    };
  }

  async findOneById(id: string) {
    const candidate = await this.prisma.candidateUser.findUnique({
      where: {
        id,
      },
      include: {
        skills: true,
      },
    });

    if (!candidate)
      throw new UnauthorizedException('This candidate is not exists.');

    return candidate;
  }

  async findOneByIdPublic(id: string) {
    const candidate = await this.prisma.candidateUser.findUnique({
      where: {
        id,
      },
      select: {
        views: true,
        id: true,
      },
    });

    if (!candidate)
      throw new UnauthorizedException('This candidate is not exists.');

    const updatedCandidateWithViews = await this.prisma.candidateUser.update({
      where: {
        id,
      },
      data: {
        views: candidate.views + 1,
      },
      include: {
        skills: true,
        blockedDomains: true,
        blockedTypes: true,
        offers: {
          select: {
            id: true,
            candidateId: true,
            employerId: true,
            vacancyId: true,
          },
        },
      },
    });

    return updatedCandidateWithViews;
  }

  async getSkills(candidateId: string) {
    return await this.prisma.candidateSkill.findMany({
      where: {
        candidateId,
      },
    });
  }

  async getFavoriteVacancies(id: string) {
    const candidate = await this.prisma.candidateUser.findUnique({
      where: {
        id,
      },
      select: {
        _count: {
          select: {
            favoriteVacancies: true,
          },
        },
        id: true,
        favoriteVacancies: {
          select: {
            vacancy: {
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
            },
            candidate: {
              include: {
                skills: true,
                favoriteVacancies: {
                  select: {
                    candidateId: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!candidate) throw new NotFoundException('Candidate is not exists.');

    const { _count, favoriteVacancies } = candidate;

    return {
      id,
      count: _count.favoriteVacancies,
      favoriteVacancies: favoriteVacancies.map((favoriteVacancy) => ({
        ...favoriteVacancy.vacancy,
      })),
    };
  }

  async addSkill(candidateId: string, dto: SkillCreateDto) {
    const skillExist = await this.prisma.candidateSkill.findFirst({
      where: {
        candidateId,
        name: dto.name,
      },
    });

    if (skillExist) throw new ConflictException('This skill already exist');

    const skill = await this.prisma.candidateSkill.create({
      data: {
        name: dto.name,
        category: dto.category,
        candidate: {
          connect: {
            id: candidateId,
          },
        },
      },
    });

    return skill;
  }

  async addVacancyToFavorite(id: string, vacancyId: string) {
    const vacancyExist = await this.prisma.vacancy.findUnique({
      where: {
        id: vacancyId,
      },
    });
    const candidateExist = await this.checkCandidateExists(id);

    if (!vacancyExist)
      throw new NotFoundException('This vacancy is not exists.');

    if (!candidateExist)
      throw new NotFoundException('This candidate is not exists.');

    const favoriteVacancy = await this.prisma.favoriteVacancy.create({
      data: {
        candidateId: id,
        vacancyId,
      },
    });

    if (!favoriteVacancy)
      throw new BadRequestException('Failed to add vacancy to favorite.');

    return await this.prisma.candidateUser.update({
      where: {
        id,
      },
      data: {
        favoriteVacancies: {
          connect: {
            id: favoriteVacancy.id,
          },
        },
      },
    });
  }

  async removeCandidateFromFavorite(id: string, favoriteId: string) {
    const candidate = await this.checkCandidateExists(id);

    const vacancy = await this.prisma.favoriteVacancy.findUnique({
      where: {
        id: favoriteId,
      },
    });

    if (!candidate) throw new NotFoundException('Candidate is not exists.');
    if (!vacancy)
      throw new NotFoundException('Favorite vacancy is not exists.');

    const result = await this.prisma.favoriteVacancy.deleteMany({
      where: {
        id: favoriteId,
        candidateId: id,
      },
    });

    return {
      success: true,
      deletedCound: result.count,
    };
  }

  async deleteSkill(id: string, skillId: string) {
    const skillExist = await this.prisma.candidateSkill.findFirst({
      where: {
        id: skillId,
      },
    });

    if (!skillExist) throw new ConflictException('This skill does not exist');

    const skill = await this.prisma.candidateSkill.deleteMany({
      where: {
        id: skillId,
      },
    });

    return {
      success: true,
      ...skill,
    };
  }

  async update(id: string, dto: CandidateUpdateDto) {
    const candidate = await this.prisma.candidateUser.findFirst({
      where: {
        id,
      },
    });

    if (!candidate) throw new NotFoundException();

    const result = await this.prisma.candidateUser.update({
      where: {
        id,
      },
      data: {
        ...dto,
      },
    });

    return {
      ...result,
    };
  }
}
