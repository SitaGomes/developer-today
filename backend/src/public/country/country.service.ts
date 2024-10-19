import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CountryService {
  constructor() {}

  async getAllCountries() {
    const { data } = await axios.get<{ countryCode: string; name: string }[]>(
      'https://date.nager.at/api/v3/AvailableCountries',
    );

    return data.map((country) => ({
      code: country.countryCode,
      name: country.name,
    }));
  }

  async getCountryName(code: string) {
    const allCountries = await this.getAllCountries();
    const country = allCountries.find((c) => c.code.includes(code));
    return country?.name || 'Not Found';
  }

  async getCountryData(code: string) {
    const name = await this.getCountryName(code);
    const borders = await this.getBorderList(code);
    const population = await this.getPopulationHistory(code);
    const flag = await this.getCountryFlag(code);
    return {
      borders,
      population,
      flag,
      name,
    };
  }

  async getBorderList(code: string) {
    const { data } = await axios.get<{
      borders: { commonName: string; countryCode: string }[];
    }>(`https://date.nager.at/api/v3/CountryInfo/${code}`);

    return data.borders.map((country) => ({
      code: country.countryCode,
      name: country.commonName,
    }));
  }

  async getPopulationHistory(code: string) {
    const { data } = await axios.get<{
      data: {
        country: string;
        code: string;
        populationCounts: { year: number; value: number }[];
      }[];
    }>('https://countriesnow.space/api/v0.1/countries/population');

    const country = data.data.find((country) => country.code.includes(code));

    return country?.populationCounts || 0;
  }

  async getCountryFlag(code: string) {
    const { data } = await axios.get<{
      data: { flag: string; iso2: string }[];
    }>('https://countriesnow.space/api/v0.1/countries/flag/images');

    return data.data.find((country) => country.iso2.includes(code))?.flag || '';
  }
}
