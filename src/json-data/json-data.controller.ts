import { Controller, Get, Query } from '@nestjs/common';
import { JsonDataService } from './json-data.service';

@Controller('data')
export class JsonDataController {
  constructor(private readonly jsonDataService: JsonDataService) {}

  @Get('query')
  queryData(@Query('q') query: string) {
    return this.jsonDataService.queryData(query);
  }
}
