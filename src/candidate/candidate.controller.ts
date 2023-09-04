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
import { CreateSkillDto } from 'src/skill/dto/create-skill.dto';
import { SkillService } from 'src/skill/skill.service';
import { UpdateContactsDto } from './dto/update-contacts.dto';

@Controller('candidate')
export class CandidateController {
  constructor(
    private readonly candidateService: CandidateService,
    private readonly skillService: SkillService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.candidateService.findOneById(id);
  }

  @Get(':id/skills')
  getCandidateSkills(@Param('id') id: string) {
    return this.candidateService.getSkills(id);
  }

  @UseGuards(JwtGuard)
  @Post(':id/skills')
  addSkill(@Param('id') id: string, @Body() createSkillDto: CreateSkillDto) {
    return this.skillService.create(id, createSkillDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/contacts')
  updateContacts(
    @Param('id') id: string,
    @Body() updateContactsDto: UpdateContactsDto,
  ) {
    return this.candidateService.updateContacts(id, updateContactsDto);
  }

  @Get(':id/contacts')
  getCandidateContacts(@Param('id') id: string) {
    return this.candidateService.getContacts(id);
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
