import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { OfferService } from './offer.service';
import { JwtGuard } from '../auth/guards/jwt.guard';

import { CreateOfferDto } from './dto/create-offer.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';

@Controller('offer')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offerService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Post()
  create(@Body() createOfferDto: CreateOfferDto) {
    return this.offerService.create(createOfferDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOfferDto: UpdateOfferDto) {
    return this.offerService.update(id, updateOfferDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.offerService.remove(+id);
  // }
}
