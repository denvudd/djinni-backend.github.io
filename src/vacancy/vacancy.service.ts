import { Injectable } from '@nestjs/common';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { PrismaService } from 'src/prisma.service';

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

  findAll() {
    return this.prismaService.vacancy.findMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} vacancy`;
  }

  update(id: number, updateVacancyDto: UpdateVacancyDto) {
    return `This action updates a #${id} vacancy`;
  }

  remove(id: number) {
    return `This action removes a #${id} vacancy`;
  }
}
