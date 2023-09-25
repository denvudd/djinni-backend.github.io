import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { PrismaService } from 'src/prisma.service';
import { ReplyOfferDto } from './dto/reply-offer.dto';
import { MoveOfferToArchiveDto } from './dto/move-offer-to-archive';
import { RefuseOfferDto } from './dto/refuse-offer.dto';
import { MoveOfferToFavoriteDto } from './dto/move-offer-to-favorite';

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
            employerId: true,
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
            candidateId: true,
            employerId: true,
          },
        },
      },
    });

    if (!candidate) throw new NotFoundException('Candidate is not exists.');
    if (!employer) throw new NotFoundException('Employer is not exists.');

    if (
      employer.offers.find((e) => e.candidateId === createOfferDto.candidateId)
    )
      throw new ConflictException('Offer is already exists.');

    if (
      candidate.offers.find((c) => c.employerId === createOfferDto.employerId)
    )
      throw new ConflictException('Offer is already exists.');

    const offer = await this.prismaService.offer.create({
      data: {
        ...createOfferDto,
        active: true,
        isArchive: false,
      },
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
    const candidate = await this.prismaService.candidateUser.findUnique({
      where: {
        id: candidateId,
      },
    });

    if (!candidate) throw new NotFoundException('Candidate is not exists.');

    const [offers, count] = await Promise.all([
      this.prismaService.offer.findMany({
        where: {
          candidateId,
          active: true,
          isArchive: false,
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
      }),
      this.prismaService.offer.count({
        where: {
          candidateId,
        },
      }),
    ]);

    return {
      offers,
      count,
    };
  }

  async getOffersByEmployerId(employerId: string) {
    const employer = await this.prismaService.employerUser.findUnique({
      where: {
        id: employerId,
      },
    });

    if (!employer) throw new NotFoundException('Employer is not exists.');

    const [offers, count] = await Promise.all([
      this.prismaService.offer.findMany({
        where: {
          employerId,
          active: true,
          isArchive: false,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        include: {
          replies: {
            orderBy: {
              updatedAt: 'asc',
            },
            select: {
              text: true,
              updatedAt: true,
            },
          },
          candidate: {
            select: {
              fullname: true,
              position: true,
              expectations: true,
              country: true,
              city: true,
              experience: true,
              english: true,
              user: {
                select: {
                  email: true,
                  avatar: true,
                },
              },
            },
          },
        },
      }),
      this.prismaService.offer.count({
        where: {
          employerId,
          active: true,
          isArchive: false,
        },
      }),
    ]);

    return {
      offers,
      count,
    };
  }

  async getArchiveOffersByEmployerId(employerId: string) {
    const employer = await this.prismaService.employerUser.findUnique({
      where: {
        id: employerId,
      },
    });

    if (!employer) throw new NotFoundException('Employer is not exists.');

    const [offers, count] = await Promise.all([
      this.prismaService.offer.findMany({
        where: {
          employerId,
          active: false,
          isArchive: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        include: {
          refusal: true,
          replies: {
            orderBy: {
              updatedAt: 'asc',
            },
            select: {
              text: true,
              updatedAt: true,
            },
          },
          candidate: {
            select: {
              fullname: true,
              position: true,
              expectations: true,
              country: true,
              city: true,
              experience: true,
              english: true,
              user: {
                select: {
                  email: true,
                  avatar: true,
                },
              },
            },
          },
        },
      }),
      this.prismaService.offer.count({
        where: {
          employerId,
          active: false,
          isArchive: true,
        },
      }),
    ]);

    return {
      offers,
      count,
    };
  }

  async moveOfferToArchive(
    employerId: string,
    offerId: string,
    moveOfferToArchiveDto: MoveOfferToArchiveDto,
  ) {
    const offer = await this.prismaService.offer.findUnique({
      where: {
        id: offerId,
        employerId: employerId,
        candidateId: moveOfferToArchiveDto.candidateId,
      },
    });

    if (!offer) throw new NotFoundException('Offer is not exists.');

    if (offer.isArchive || !offer.active)
      throw new ConflictException('Offer is already archived or not active.');

    const { active, id, isArchive, isFavorite } =
      await this.prismaService.offer.update({
        where: {
          id: offerId,
        },
        data: {
          active: false,
          isArchive: true,
        },
        select: {
          active: true,
          isArchive: true,
          isFavorite: true,
          id: true,
        },
      });

    return {
      success: true,
      active,
      isArchive,
      isFavorite,
      offerId: id,
    };
  }

  async getFavoriteOffersByEmployerId(employerId: string) {
    const employer = await this.prismaService.employerUser.findUnique({
      where: {
        id: employerId,
      },
    });

    if (!employer) throw new NotFoundException('Employer is not exists.');

    const [offers, count] = await Promise.all([
      this.prismaService.offer.findMany({
        where: {
          employerId,
          isFavorite: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        include: {
          refusal: true,
          replies: {
            orderBy: {
              updatedAt: 'asc',
            },
            select: {
              text: true,
              updatedAt: true,
            },
          },
          candidate: {
            select: {
              fullname: true,
              position: true,
              expectations: true,
              country: true,
              city: true,
              experience: true,
              english: true,
              user: {
                select: {
                  email: true,
                  avatar: true,
                },
              },
            },
          },
        },
      }),
      this.prismaService.offer.count({
        where: {
          employerId,
          isFavorite: true,
        },
      }),
    ]);

    return {
      offers,
      count,
    };
  }

  async moveOfferToFavorite(
    employerId: string,
    offerId: string,
    moveOfferToFavoriteDto: MoveOfferToFavoriteDto,
  ) {
    const offer = await this.prismaService.offer.findUnique({
      where: {
        id: offerId,
        employerId: employerId,
        candidateId: moveOfferToFavoriteDto.candidateId,
      },
    });

    if (!offer) throw new NotFoundException('Offer is not exists.');

    if (offer.isArchive || !offer.active)
      throw new ConflictException(
        'Offer is already in favorite or not active.',
      );

    const { active, id, isArchive, isFavorite } =
      await this.prismaService.offer.update({
        where: {
          id: offerId,
        },
        data: {
          isFavorite: true,
        },
        select: {
          active: true,
          isArchive: true,
          isFavorite: true,
          id: true,
        },
      });

    return {
      success: true,
      active,
      isArchive,
      isFavorite,
      offerId: id,
    };
  }

  async refuseOffer(
    employerId: string,
    offerId: string,
    refuseOfferDto: RefuseOfferDto,
  ) {
    const offer = await this.prismaService.offer.findUnique({
      where: {
        id: offerId,
        employerId: employerId,
        candidateId: refuseOfferDto.candidateId,
      },
    });

    if (!offer) throw new NotFoundException('Offer is not exists.');

    if (offer.isArchive || !offer.active)
      throw new ConflictException('Offer is already archived or not active.');

    const [refusal] = await this.prismaService.$transaction([
      this.prismaService.offerRefusal.create({
        data: {
          reason: refuseOfferDto.reason,
          message: refuseOfferDto.message,
          offer: {
            connect: {
              id: offerId,
            },
          },
          employer: {
            connect: {
              id: employerId,
            },
          },
          candidate: {
            connect: {
              id: refuseOfferDto.candidateId,
            },
          },
        },
      }),
      this.prismaService.offer.update({
        where: {
          id: offerId,
        },
        data: {
          active: false,
          isArchive: true,
        },
      }),
    ]);

    return {
      success: true,
      candidateId: refusal.candidateId,
      employerId: refusal.employerId,
      offerId: refusal.offerId,
      reason: refusal.reason,
      message: refusal.message,
    };
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
        replies: {
          orderBy: {
            createdAt: 'asc',
          },
          include: {
            author: {
              select: {
                email: true,
                avatar: true,
                role: true,
                id: true,
                employer_info: {
                  select: {
                    id: true,
                    fullname: true,
                  },
                },
                candidate_info: {
                  select: {
                    id: true,
                    fullname: true,
                  },
                },
              },
            },
            replyTo: true,
            replies: true,
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
                id: true,
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
            expectations: true,
            position: true,
            preferableLang: true,
            communicateMethod: true,
            skype: true,
            github: true,
            linkedIn: true,
            telegram: true,
            whatsApp: true,
            user: {
              select: {
                id: true,
                avatar: true,
                email: true,
              },
            },
          },
        },
        refusal: {
          select: {
            createdAt: true,
            reason: true,
            message: true,
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

  async replyToOfferAsEmployer(
    employerId: string,
    offerId: string,
    replyToOfferDto: ReplyOfferDto,
  ) {
    const [employer, offer, reply] = await this.prismaService.$transaction([
      this.prismaService.employerUser.findUnique({
        where: {
          id: employerId,
        },
        select: {
          id: true,
        },
      }),
      this.prismaService.offer.findUnique({
        where: {
          id: offerId,
        },
      }),
      this.prismaService.offer.findUnique({
        where: {
          id: offerId,
        },
      }),
    ]);

    if (!employer) throw new NotFoundException('Employer is not exists.');
    if (!offer) throw new NotFoundException('Offer is not exists.');
    if (!reply) throw new NotFoundException('Reply is not exists.');

    // update updatedAt offer before create reply for sorting offers by new replies
    return await Promise.all([
      this.prismaService.offer.update({
        where: {
          id: offerId,
        },
        data: {
          updatedAt: new Date(),
        },
      }),
      this.prismaService.replyOnOffer.create({
        data: {
          offerId,
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
      }),
    ]);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} offer`;
  // }
}
