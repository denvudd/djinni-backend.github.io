import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/dto/user.dto';
import { hash } from 'bcrypt';
import { CandidateUpdateDto } from './dto/dto/candidate.dto';
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
        role: dto.role,
      },
    });

    if (user)
      throw new ConflictException('User with this email already created');

    const newUser = await this.prisma.user.create({
      data: {
        fullname: dto.fullname,
        email: dto.email,
        password: await hash(dto.password, 10),
        role: dto.role,
      },
    });

    if (dto.role === 'Candidate') {
      await this.prisma.candidateUser.create({
        data: {
          userId: newUser.id,
          user: {
            connect: {
              id: newUser.id,
            },
          },
          english: 'NoEnglish',
          country: 'Ukraine',
          employmentOptions: 'Remote',
          communicateMethod: 'Djinni',
          preferableLang: 'Ukrainian',
        },
      });
    } else {
      await this.prisma.employerUser.create({
        data: {
          userId: newUser.id,
        },
      });
    }

    const { password, ...result } = newUser;

    return result;
  }

  async updateCandidate(id: string, dto: CandidateUpdateDto) {
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

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (user.role === 'Candidate') {
      return await this.findCandidateById(user.id);
    } else {
      return await this.findEmployerById(user.id);
    }
  }

  async findCandidateById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        role: 'Candidate',
      },
      include: {
        candidate_info: true,
      },
    });

    if (!user) throw new UnauthorizedException('This user is not exists.');

    const { password, ...result } = user;

    return result;
  }

  async findEmployerById(id: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
        role: 'Employer',
      },
      include: {
        employer_info: true,
      },
    });

    if (!user) throw new UnauthorizedException('This user is not exists.');

    const { password, ...result } = user;

    return result;
  }
}
