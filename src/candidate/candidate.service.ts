import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CandidateUpdateDto } from './dto/update-candidate.dto';
import { PrismaService } from 'src/prisma.service';
import { SkillCreateDto } from './dto/create-skill.dto';
import { CadidatesListQueryDto } from './dto/candidates-list.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

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
        },
        skip: (page - 1) * limit,
        take: limit,
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
      success: true,
      ...result,
    };
  }
}
