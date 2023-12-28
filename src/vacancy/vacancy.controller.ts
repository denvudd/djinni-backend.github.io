import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { Query, UseGuards } from '@nestjs/common/decorators';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { JwtGuard } from '../auth/guards/jwt.guard';

import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { VacanciesListQueryDto } from './dto/vacancies-list.dto';
import { VacanciesByProfileQueryDto } from './dto/vacancies-by-profile.dto';

@Controller('vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @UseGuards(JwtGuard)
  @Get('list/:candidateId')
  findAllByProfile(
    @Param('candidateId') candidateId: string,
    @Query() queryParams: VacanciesByProfileQueryDto,
  ) {
    return this.vacancyService.getListOfVacanciesByProfile(
      candidateId,
      queryParams,
    );
  }

  @Get('list')
  findAll(@Query() queryParams: VacanciesListQueryDto) {
    return this.vacancyService.getListOfVacancies(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacancyService.findOneById(id);
  }

  @Get(':id/public')
  findPublicOne(@Param('id') id: string) {
    return this.vacancyService.findOneByIdPublic(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createVacancyDto: CreateVacancyDto) {
    if (!createVacancyDto.employerId) {
      return new ForbiddenException('Access denied');
    }

    return this.vacancyService.create(createVacancyDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacancyService.update(id, updateVacancyDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/add-to-draft')
  addToDraft(@Param('id') id: string) {
    return this.vacancyService.addToDraft(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/remove-from-draft')
  removeFromDraft(@Param('id') id: string) {
    return this.vacancyService.removeFromDraft(id);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vacancyService.remove(+id);
  // }
}
