import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Slogan } from './slogan.entity';
import { SloganService } from './slogan.service';
import { SloganController } from './slogan.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Slogan])],
  providers: [SloganService],
  controllers: [SloganController],
})
export class SloganModule {}
