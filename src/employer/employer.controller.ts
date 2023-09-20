import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { VacancyService } from 'src/vacancy/vacancy.service';
import { AddFavoriteCandidateDto } from './dto/add-favorite-candidate.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OfferService } from 'src/offer/offer.service';
import { CreateOfferDto } from 'src/offer/dto/create-offer.dto';

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

  @Get(':id/offers')
  getOffersByEmployerId(@Param('id') id: string) {
    return this.offerService.getOffersByEmployerId(id);
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

  @Post(':id/offer')
  createOffer(@Param('id') id: string, @Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

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
