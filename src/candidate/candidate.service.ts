import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { CandidateUpdateDto } from './dto/update-candidate.dto';
import { PrismaService } from 'src/prisma.service';
import { SkillCreateDto } from './dto/create-skill.dto';
import { UpdateContactsDto } from './dto/update-contacts.dto';

@Injectable()
export class CandidateService {
  constructor(private prisma: PrismaService) {}

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

  async getContacts(candidateId: string) {
    return await this.prisma.userCandidateLinks.findMany({
      where: {
        candidateId,
      },
    });
  }

  async updateContacts(candidateId: string, dto: UpdateContactsDto) {
    const { contactsId, ...payload } = dto;

    const candidateExist = await this.prisma.userCandidateLinks.findFirst({
      where: {
        id: dto.contactsId,
        candidateId,
      },
    });

    if (!candidateExist)
      throw new NotFoundException('This contacts information does not exist');

    return await this.prisma.userCandidateLinks.update({
      where: {
        id: dto.contactsId,
        candidateId,
      },
      data: {
        ...payload,
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
