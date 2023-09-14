import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/dto/user.dto';
import { hash } from 'bcrypt';
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
          filled: false,
        },
      });

      const { password, ...result } = newUser;

      return {
        ...result,
        candidateId: candidate.id,
      };
    } else {
      const employer = await this.prisma.employerUser.create({
        data: {
          userId: newUser.id,
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });

      const { password, ...result } = newUser;

      return {
        ...result,
        employerId: employer.id,
      };
    }
  }

  async findUserByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        candidate_info: {
          select: {
            id: true,
            fullname: true,
            filled: true,
          },
        },
        employer_info: {
          select: {
            id: true,
            fullname: true,
            filled: true,
          },
        },
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
            filled: true,
          },
        },
        employer_info: {
          select: {
            id: true,
            filled: true,
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
        filled: user.candidate_info[0].filled,
      };
    } else {
      const { employer_info, password, candidate_info, ...result } = user;

      return {
        ...result,
        employer_id: employer_info[0].id,
        filled: user.employer_info[0].filled,
      };
    }
  }
}
