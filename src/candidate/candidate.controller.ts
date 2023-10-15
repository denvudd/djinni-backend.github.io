import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Query,
  Delete,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OfferService } from 'src/offer/offer.service';
import { CandidateService } from './candidate.service';

import { CandidateUpdateDto } from './dto/update-candidate.dto';
import { SkillCreateDto } from './dto/create-skill.dto';
import { CadidatesListQueryDto } from './dto/candidates-list.dto';
import { AddFavoriteVacancyDto } from './dto/add-favorite-vacancy.dto';

@Controller('candidate')
export class CandidateController {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly offerService: OfferService,
  ) {}

  @Get('list')
  findAll(@Query() queryParams: CadidatesListQueryDto) {
    return this.candidateService.getListOfCandidates(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateService.findOneById(id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/offers')
  getOffers(@Param('id') id: string) {
    return this.offerService.getOffersByCandidateId(id);
  }

  @Get(':id/public')
  findOneByIdPublic(@Param('id') id: string) {
    return this.candidateService.findOneByIdPublic(id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/skills')
  getCandidateSkills(@Param('id') id: string) {
    return this.candidateService.getSkills(id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/favorite-vacancies')
  getFavoriteVacancies(@Param('id') id: string) {
    return this.candidateService.getFavoriteVacancies(id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/skills')
  addSkill(@Param('id') id: string, @Body() createSkillDto: SkillCreateDto) {
    return this.candidateService.addSkill(id, createSkillDto);
  }

  @Post(':id/vacancy-to-favorite')
  addFavovoriteVacancy(
    @Param('id') id: string,
    @Body() addFavoriteVacancyDto: AddFavoriteVacancyDto,
  ) {
    return this.candidateService.addVacancyToFavorite(
      id,
      addFavoriteVacancyDto.vacancyId,
    );
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() candidateUpdateDto: CandidateUpdateDto,
  ) {
    return this.candidateService.update(id, candidateUpdateDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id/vacancy-to-favorite/:favoriteId')
  removeCandidateFromFavorite(
    @Param('id') id: string,
    @Param('favoriteId') favoriteId: string,
  ) {
    return this.candidateService.removeCandidateFromFavorite(id, favoriteId);
  }

  @UseGuards(JwtGuard)
  @Delete(':id/skills/:skillId')
  deleteSkill(@Param('id') id: string, @Param('skillId') skillId: string) {
    return this.candidateService.deleteSkill(id, skillId);
  }
}
