import { Module } from '@nestjs/common';
import { JsonDataService } from './json-data.service';
import { JsonDataController } from './json-data.controller';

@Module({
  providers: [JsonDataService],
  controllers: [JsonDataController],
})
export class JsonDataModule {}
