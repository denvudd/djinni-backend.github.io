import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { VacancyService } from 'src/vacancy/vacancy.service';
import { AddFavoriteCandidateDto } from './dto/add-favorite-candidate.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OfferService } from 'src/offer/offer.service';
import { CreateOfferDto } from 'src/offer/dto/create-offer.dto';
import { MoveOfferToArchiveDto } from 'src/offer/dto/move-offer-to-archive';
import { ReplyOfferDto } from 'src/offer/dto/reply-offer.dto';

@Controller('employer')
export class EmployerController {
  constructor(
    private readonly employerService: EmployerService,
    private readonly vacancyService: VacancyService,
    private readonly offerService: OfferService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employerService.findOneById(id);
  }

  @Get(':id/vacancies')
  getEmployerVacancies(@Param('id') id: string) {
    return this.employerService.getEmployerVacancies(id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/vacancies/drafts')
  getDraftVacancies(@Param('id') id: string) {
    return this.vacancyService.getDrafts(id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/favorite-candidates')
  getFavoriteCandidates(@Param('id') id: string) {
    return this.employerService.getFavoriteCandidates(id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/offers')
  getOffersByEmployerId(@Param('id') id: string) {
    return this.offerService.getOffersByEmployerId(id);
  }

  @Get(':id/offers/acrhive')
  getArchiveOffersByEmployerId(@Param('id') id: string) {
    return this.offerService.getArchiveOffersByEmployerId(id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/candidate-to-favorite')
  addCandidateToFavorite(
    @Param('id') id: string,
    @Body() addFavoriteCandidateDto: AddFavoriteCandidateDto,
  ) {
    return this.employerService.addCandidateToFavorite(
      id,
      addFavoriteCandidateDto.candidateId,
    );
  }

  @UseGuards(JwtGuard)
  @Post(':id/offer')
  createOffer(@Param('id') id: string, @Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @Post(':id/offer/:offerId/reply')
  replyOffer(
    @Param('id') employerId: string,
    @Param('offerId') offerId: string,
    @Body() replyOfferDto: ReplyOfferDto,
  ) {
    return this.offerService.replyToOfferAsEmployer(
      employerId,
      offerId,
      replyOfferDto,
    );
  }

  @UseGuards(JwtGuard)
  @Delete(':id/offer/:offerId')
  deleteOffer(@Param('id') id: string, @Param('offerId') offerId: string) {
    return this.offerService.deleteOfferByEmployerId(id, offerId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id/candidate-to-favorite/:favoriteId')
  removeCandidateFromFavorite(
    @Param('id') id: string,
    @Param('favoriteId') favoriteId: string,
  ) {
    return this.employerService.removeCandidateFromFavorite(id, favoriteId);
  }

  @Patch(':id/offer/acrhive')
  moveOfferToArchive(
    @Param('id') id: string,
    @Body() moveOfferToArchiveDto: MoveOfferToArchiveDto,
  ) {
    return this.offerService.moveOfferToArchive(id, moveOfferToArchiveDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEmployerDto: UpdateEmployerDto,
  ) {
    return this.employerService.update(id, updateEmployerDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.employerService.remove(+id);
  // }
}
