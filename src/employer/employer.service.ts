import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

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

  async update(id: string, dto: UpdateEmployerDto) {
    const employer = await this.prisma.candidateUser.findFirst({
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

  // remove(id: number) {
  //   return `This action removes a #${id} employer`;
  // }
}
