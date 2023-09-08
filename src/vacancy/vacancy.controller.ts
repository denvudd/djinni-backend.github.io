import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Query, UseGuards } from '@nestjs/common/decorators';
import { ForbiddenException } from '@nestjs/common/exceptions';
import { VacanciesListQueryDto } from './dto/vacancies-list.dto';

@Controller('vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createVacancyDto: CreateVacancyDto) {
    if (!createVacancyDto.employerId) {
      return new ForbiddenException('Access denied');
    }

    return this.vacancyService.create(createVacancyDto);
  }

  @Get('list')
  findAll(@Query() queryParams: VacanciesListQueryDto) {
    return this.vacancyService.getListOfVacancies(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vacancyService.findOneById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVacancyDto: UpdateVacancyDto) {
    return this.vacancyService.update(id, updateVacancyDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.vacancyService.remove(+id);
  // }
}
