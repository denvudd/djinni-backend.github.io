import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PrismaService } from 'src/prisma.service';
import { ReplyOfferDto } from './dto/reply-offer.dto';

@Injectable()
export class OfferService {
  constructor(private prismaService: PrismaService) {}
  async create(createOfferDto: CreateOfferDto) {
    const candidate = await this.prismaService.candidateUser.findUnique({
      where: {
        id: createOfferDto.candidateId,
      },
      select: {
        id: true,
        offers: {
          select: {
            candidateId: true,
          },
        },
      },
    });

    const employer = await this.prismaService.employerUser.findUnique({
      where: {
        id: createOfferDto.employerId,
      },
      select: {
        id: true,
        offers: {
          select: {
            employerId: true,
          },
        },
      },
    });

    if (!candidate) throw new NotFoundException('Candidate is not exists.');
    if (!employer) throw new NotFoundException('Employer is not exists.');

    if (employer.offers.find((e) => e.employerId === createOfferDto.employerId))
      throw new ConflictException('Offer is already exists.');

    if (
      candidate.offers.find((c) => c.candidateId === createOfferDto.candidateId)
    )
      throw new ConflictException('Offer is already exists.');

    const offer = await this.prismaService.offer.create({
      data: createOfferDto,
      include: {
        vacancy: {
          select: {
            active: true,
            category: true,
            id: true,
          },
        },
      },
    });

    return offer;
  }

  async getOffersByCandidateId(candidateId: string) {
    return await this.prismaService.offer.findMany({
      where: {
        candidateId,
      },
      include: {
        vacancy: {
          select: {
            name: true,
            companyType: true,
            employmentOptions: true,
            employer: {
              select: {
                positionAndCompany: true,
                companyName: true,
                user: {
                  select: {
                    avatar: true,
                    createdAt: true,
                    email: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async getOffersByEmployerId(employerId: string) {
    return await this.prismaService.offer.findMany({
      where: {
        employerId,
      },
    });
  }

  async deleteOfferByEmployerId(id: string, offerId) {
    const offer = await this.prismaService.offer.findUnique({
      where: {
        id,
      },
    });

    if (!offer) throw new NotFoundException('Offer is not exists.');

    const deleted = await this.prismaService.offer.deleteMany({
      where: {
        id: offer.id,
      },
    });

    return {
      success: true,
      deletedCount: deleted.count,
    };
  }

  async findOne(id: string) {
    return await this.prismaService.offer.findUnique({
      where: {
        id,
      },
      include: {
        vacancy: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            domain: true,
          },
        },
        employer: {
          select: {
            fullname: true,
            companyLink: true,
            positionAndCompany: true,
            telegram: true,
            linkedIn: true,
            user: {
              select: {
                email: true,
                avatar: true,
              },
            },
          },
        },
        candidate: {
          select: {
            fullname: true,
            city: true,
            country: true,
            category: true,
            english: true,
            experience: true,
            position: true,
            preferableLang: true,
            user: {
              select: {
                avatar: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, updateOfferDto: UpdateOfferDto) {
    return await this.prismaService.offer.update({
      where: {
        id,
      },
      data: updateOfferDto,
      include: {
        vacancy: {
          select: {
            id: true,
            createdAt: true,
            updatedAt: true,
            domain: true,
          },
        },
        employer: {
          select: {
            fullname: true,
            companyLink: true,
            positionAndCompany: true,
            telegram: true,
            linkedIn: true,
            user: {
              select: {
                email: true,
                avatar: true,
              },
            },
          },
        },
        candidate: {
          select: {
            fullname: true,
            city: true,
            country: true,
            category: true,
            english: true,
            experience: true,
            position: true,
            preferableLang: true,
            user: {
              select: {
                avatar: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async replyToOffer(id: string, replyToOfferDto: ReplyOfferDto) {
    return await this.prismaService.replyOnOffer.create({
      data: {
        offerId: id,
        ...replyToOfferDto,
      },
      include: {
        author: {
          select: {
            avatar: true,
            candidate_info: {
              select: {
                fullname: true,
              },
            },
            employer_info: {
              select: {
                fullname: true,
              },
            },
          },
        },
      },
    });
  }

  // remove(id: number) {
  //   return `This action removes a #${id} offer`;
  // }
}
