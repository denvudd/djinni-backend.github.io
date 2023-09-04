import { Controller, Get, Param, Delete } from '@nestjs/common';
import { SkillService } from './skill.service';

@Controller('skills')
export class SkillController {
  constructor(private readonly skillService: SkillService) {}

  @Get()
  findAll() {
    return this.skillService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.skillService.delete(id);
  }
}
