import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Post()
  create(@Body() createEmployerDto: CreateEmployerDto) {
    return this.employerService.create(createEmployerDto);
  }

  @Get()
  findAll() {
    return this.employerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployerDto: UpdateEmployerDto) {
    return this.employerService.update(+id, updateEmployerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employerService.remove(+id);
  }
}
