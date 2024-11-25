import { Module } from '@nestjs/common';
import { HuggingFaceService } from './huggingface.service';
import { HuggingFaceController } from './huggingface.controller';

@Module({
  providers: [HuggingFaceService],
  controllers: [HuggingFaceController],
})
export class HuggingFaceModule {}
