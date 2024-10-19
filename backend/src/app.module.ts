import { Module } from '@nestjs/common';
import { CountryController } from './public/country/country.controller';
import { CountryService } from './public/country/country.service';

@Module({
  imports: [],
  controllers: [CountryController],
  providers: [CountryService],
})
export class AppModule {}
