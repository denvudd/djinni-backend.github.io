import { ConflictException, Injectable } from '@nestjs/common';
import { CreateSkillDto } from './dto/create-skill.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SkillService {
  constructor(private prisma: PrismaService) {}
  async create(candidateId: string, dto: CreateSkillDto) {
    const skillExist = await this.prisma.candidateSkill.findFirst({
      where: {
        name: dto.name,
      },
    });

    if (skillExist) throw new ConflictException('This skill already exist');

    const skill = await this.prisma.candidateSkill.create({
      data: {
        name: dto.name,
        candidate: {
          connect: {
            id: candidateId,
          },
        },
      },
    });

    return skill;
  }

  async findAll() {
    return await this.prisma.candidateSkill.findMany();
  }

  delete(id: string) {
    return `This action removes a #${id} skill`;
  }
}
