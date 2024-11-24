import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { SloganService } from './slogan.service';
import { Slogan } from './slogan.entity';

@Controller('slogans')
export class SloganController {
  constructor(private readonly sloganService: SloganService) {}

  @Get()
  findAll(): Promise<Slogan[]> {
    return this.sloganService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Slogan> {
    return this.sloganService.findOne(id);
  }

  @Post()
  create(@Body('slogan') slogan: string): Promise<Slogan | { error: string }> {
    return this.sloganService.create(slogan);
  }

  @Put(':id')
  updateLikes(
    @Param('id') id: number,
    @Body('likes') likes: number,
  ): Promise<Slogan> {
    return this.sloganService.updateLikes(id, likes);
  }
}