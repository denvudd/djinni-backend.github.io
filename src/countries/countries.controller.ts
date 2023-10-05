import { Controller, Get } from '@nestjs/common';
import { CountriesService } from './countries.service';

@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Get('/countries')
  findCountries() {
    return this.countriesService.findAllCountries();
  }

  @Get()
  findUkrainianCities() {
    return this.countriesService.findUkrainianCities();
  }

  @Get('popular')
  findPopularCities() {
    return this.countriesService.findPopularCities();
  }
}
