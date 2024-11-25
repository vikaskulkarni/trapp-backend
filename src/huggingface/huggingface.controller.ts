import { Controller, Get, Query } from '@nestjs/common';
import { HuggingFaceService } from './huggingface.service';

@Controller('huggingface')
export class HuggingFaceController {
  constructor(private huggingFaceService: HuggingFaceService) {}

  @Get('chat')
  async chat(@Query('query') query: string) {
    const response = await this.huggingFaceService.generateResponse(query);
    return { response };
  }
}
