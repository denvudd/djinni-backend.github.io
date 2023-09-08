import {
  Injectable,
  ConflictException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/dto/user.dto';
import { hash } from 'bcrypt';
import { CandidateService } from 'src/candidate/candidate.service';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private candidateService: CandidateService,
  ) {}

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
      const candidate = await this.prisma.candidateUser.create({
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

      const { password, ...result } = newUser;

      return {
        ...result,
        candidateId: candidate.id,
      };
    } else {
      await this.prisma.employerUser.create({
        data: {
          userId: newUser.id,
        },
      });
    }
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
      include: {
        candidate_info: {
          select: {
            id: true,
          },
        },
        employer_info: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('This user is not exist');

    if (user.role === 'Candidate') {
      const { candidate_info, password, employer_info, ...result } = user;

      return {
        ...result,
        candidate_id: candidate_info[0].id,
      };
    } else {
      const { employer_info, password, candidate_info, ...result } = user;

      return {
        ...result,
        employer_id: employer_info[0].id,
      };
    }
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
