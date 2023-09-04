import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CandidateUpdateDto } from './dto/dto/candidate.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async findUser(@Param('id') id: string) {
    return await this.userService.findUserById(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/candidate')
  async updateUserCandidate(
    @Param('id') id: string,
    @Body() dto: CandidateUpdateDto,
  ) {
    return await this.userService.updateCandidate(id, dto);
  }
}
