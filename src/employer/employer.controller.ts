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
import { CreateEmployerDto } from './dto/create-employer.dto';
import { UpdateEmployerDto } from './dto/update-employer.dto';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employerService.findOneById(id);
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
