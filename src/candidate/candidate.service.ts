import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CandidateUpdateDto } from './dto/update-candidate.dto';
import { PrismaService } from 'src/prisma.service';
import { SkillCreateDto } from './dto/create-skill.dto';
import { QueryDto } from './validators/candidates-list.validator';
import { Prisma } from '@prisma/client';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

  async getListOfCandidates(queryParams: QueryDto) {
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

    const filter: Prisma.CandidateUserWhereInput = {
      experience: {
        gte: exp_from,
        lte: exp_to,
      },
      expectations: {
        gte: salary_min,
        lte: salary_max,
      },
    };

    if (title) {
      filter.category = title;
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

    return this.prisma.candidateUser.findMany({
      where: filter,
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  async findOneById(id: string) {
    const candidate = await this.prisma.candidateUser.findUnique({
      where: {
        id,
      },
      include: {
        skills: true,
        blockedDomains: true,
        blockedTypes: true,
      },
    });

    if (!candidate)
      throw new UnauthorizedException('This candidate is not exists.');

    return candidate;
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

  async deleteSkill(id: string, dto: SkillCreateDto) {
    const skillExist = await this.prisma.candidateSkill.findFirst({
      where: {
        name: dto.name,
      },
    });

    if (!skillExist) throw new ConflictException('This skill does not exist');

    const skill = await this.prisma.candidateSkill.delete({
      where: {
        id,
      },
    });

    return skill;
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
