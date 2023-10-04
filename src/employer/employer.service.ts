import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { PrismaService } from 'src/prisma.service';
import { CreateSubscribeDto } from './dto/create-subscribe.dto';

@Injectable()
export class EmployerService {
  constructor(private prisma: PrismaService) {}

  async findOneById(id: string) {
    const employer = await this.prisma.employerUser.findUnique({
      where: {
        id,
      },
    });

    if (!employer)
      throw new UnauthorizedException('This employer is not exists.');

    return employer;
  }

  async getEmployerVacancies(id: string) {
    const employer = await this.prisma.employerUser.findUnique({
      where: {
        id,
      },
      include: {
        vacancies: true,
      },
    });

    if (!employer)
      throw new UnauthorizedException('This employer is not exists.');

    return employer.vacancies;
  }

  async update(id: string, dto: UpdateEmployerDto) {
    const employer = await this.prisma.employerUser.findFirst({
      where: {
        id,
      },
    });

    if (!employer) throw new NotFoundException();

    const result = await this.prisma.employerUser.update({
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

  async addCandidateToFavorite(id: string, candidateId: string) {
    const employer = await this.prisma.employerUser.findUnique({
      where: {
        id,
      },
    });

    const candidate = await this.prisma.candidateUser.findUnique({
      where: {
        id: candidateId,
      },
    });

    if (!employer) throw new NotFoundException('Employer is not exists.');
    if (!candidate) throw new NotFoundException('Candidate is not exists.');

    const favoriteCandidate = await this.prisma.favoriteCandidate.create({
      data: {
        candidateId,
        employerId: employer.id,
      },
    });

    if (!favoriteCandidate)
      throw new BadRequestException('Failed to add candidate to favorite.');

    return await this.prisma.employerUser.update({
      where: {
        id,
      },
      data: {
        favoriteCandidates: {
          connect: {
            id: favoriteCandidate.id,
          },
        },
      },
    });
  }

  async removeCandidateFromFavorite(id: string, favoriteId: string) {
    const employer = await this.prisma.employerUser.findUnique({
      where: {
        id,
      },
    });

    const candidate = await this.prisma.favoriteCandidate.findUnique({
      where: {
        id: favoriteId,
      },
    });

    if (!employer) throw new NotFoundException('Employer is not exists.');
    if (!candidate)
      throw new NotFoundException('Favorite candidate is not exists.');

    const result = await this.prisma.favoriteCandidate.deleteMany({
      where: {
        id: favoriteId,
        employerId: id,
      },
    });

    return {
      success: true,
      deletedCound: result.count,
    };
  }

  async getFavoriteCandidates(id: string) {
    const employer = await this.prisma.employerUser.findUnique({
      where: {
        id,
      },
      select: {
        _count: {
          select: {
            favoriteCandidates: true,
          },
        },
        id: true,
        favoriteCandidates: {
          select: {
            candidate: {
              include: {
                skills: true,
                favoriteCandidates: {
                  select: {
                    employerId: true,
                    id: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!employer) throw new NotFoundException('Employer is not exists.');

    const { _count, favoriteCandidates } = employer;

    return {
      id,
      count: _count.favoriteCandidates,
      favoriteCandidates: favoriteCandidates.map((favoriteCandidate) => ({
        ...favoriteCandidate.candidate,
      })),
    };
  }

  async createSubscribe(id: string, createSubscribeDto: CreateSubscribeDto) {
    const employer = await this.prisma.employerUser.findUnique({
      where: {
        id,
      },
    });

    if (!employer) throw new NotFoundException('Employer is not exists.');

    const subscribe = await this.prisma.employerSubscribe.create({
      data: {
        employerId: id,
        ...createSubscribeDto,
      },
    });

    if (!subscribe)
      throw new BadRequestException('Failed to create subscribe.');

    return await this.prisma.employerUser.update({
      where: {
        id,
      },
      data: {
        subscriptions: {
          connect: {
            id: subscribe.id,
          },
        },
      },
    });
  }

  async removeSubscribe(id: string, subscribeId: string) {
    const employer = await this.prisma.employerUser.findUnique({
      where: {
        id,
      },
    });

    const subscribe = await this.prisma.employerSubscribe.findUnique({
      where: {
        id: subscribeId,
        employerId: id,
      },
    });

    if (!employer) throw new NotFoundException('Employer is not exists.');
    if (!subscribe) throw new NotFoundException('Subscribe is not exists.');

    const result = await this.prisma.employerSubscribe.deleteMany({
      where: {
        id: subscribeId,
        employerId: id,
      },
    });

    return {
      success: true,
      deletedCound: result.count,
    };
  }

  // remove(id: number) {
  //   return `This action removes a #${id} employer`;
  // }
}
