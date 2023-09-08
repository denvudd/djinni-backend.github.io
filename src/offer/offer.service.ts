import { Injectable } from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PrismaService } from 'src/prisma.service';
import { ReplyOfferDto } from './dto/reply-offer.dto';

@Injectable()
export class OfferService {
  constructor(private prismaService: PrismaService) {}
  async create(createOfferDto: CreateOfferDto) {
    const offer = await this.prismaService.offer.create({
      data: createOfferDto,
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
