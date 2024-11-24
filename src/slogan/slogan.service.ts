import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slogan } from './slogan.entity';

@Injectable()
export class SloganService {
  constructor(
    @InjectRepository(Slogan)
    private slogansRepository: Repository<Slogan>,
  ) {}

  findAll(): Promise<Slogan[]> {
    return this.slogansRepository.find();
  }

  findOne(id: number): Promise<Slogan> {
    return this.slogansRepository.findOneBy({ id });
  }

  async create(slogan: string): Promise<Slogan | { error: string }> {
    const sloganCount = await this.slogansRepository.count();
    if (sloganCount > 50) {
      return { error: 'Only 50 slogans are allowed' };
    }
    const newSlogan = this.slogansRepository.create({ slogan, likes: 0 });
    return this.slogansRepository.save(newSlogan);
  }

  async updateLikes(id: number, likes: number): Promise<Slogan> {
    const slogan = await this.slogansRepository.findOneBy({ id });
    if (!slogan) {
      throw new NotFoundException(`Slogan with ID ${id} not found`);
    }
    slogan.likes = likes;
    return this.slogansRepository.save(slogan);
  }
}
