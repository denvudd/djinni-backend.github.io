import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { VacancyService } from 'src/vacancy/vacancy.service';

@Controller('employer')
export class EmployerController {
  constructor(
    private readonly employerService: EmployerService,
    private readonly vacancyService: VacancyService,
  ) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employerService.findOneById(id);
  }

  @Get(':id/vacancies')
  getEmployerVacancies(@Param('id') id: string) {
    return this.employerService.getEmployerVacancies(id);
  }

  @Get(':id/vacancies/drafts')
  getDraftVacancies(@Param('id') id: string) {
    return this.vacancyService.getDrafts(id);
  }

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
