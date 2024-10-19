import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { CountryService } from './country.service';

@Controller('country')
export class CountryController {
  constructor(private countryService: CountryService) {}

  @Get('all')
  async getAllCountries() {
    return await this.countryService.getAllCountries();
  }

  @Get('')
  async getCountry(@Query('code') code: string) {
    if (!code) {
      throw new NotFoundException();
    }

    return this.countryService.getCountryData(code);
  }
}
