import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { PrismaService } from 'src/prisma.service';

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
      success: true,
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

    const result = await this.prisma.employerUser.update({
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

    return result;
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

  // remove(id: number) {
  //   return `This action removes a #${id} employer`;
  // }
}
