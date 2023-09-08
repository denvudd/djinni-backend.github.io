import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { CandidateService } from './candidate.service';
import { CandidateUpdateDto } from './dto/update-candidate.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { OfferService } from 'src/offer/offer.service';
import { SkillCreateDto } from './dto/create-skill.dto';
@Controller('candidate')
export class CandidateController {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly offerService: OfferService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateService.findOneById(id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/skills')
  getCandidateSkills(@Param('id') id: string) {
    return this.candidateService.getSkills(id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/skills')
  addSkill(@Param('id') id: string, @Body() createSkillDto: SkillCreateDto) {
    return this.candidateService.addSkill(id, createSkillDto);
  }

  @UseGuards(JwtGuard)
  @Get(':id/offers')
  getOffers(@Param('id') id: string) {
    return this.offerService.getOffersByCandidateId(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() candidateUpdateDto: CandidateUpdateDto,
  ) {
    return this.candidateService.update(id, candidateUpdateDto);
  }
}
