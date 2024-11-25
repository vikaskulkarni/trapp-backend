import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slogan } from './slogan.entity';
import { updateJsonFile } from 'src/utility/jsonFileUpdater';
import { CreateSloganDto } from './slogan.dto';

@Injectable()
export class SloganService {
  constructor(
    @InjectRepository(Slogan)
    private slogansRepository: Repository<Slogan>,
  ) {}

  findAll(): Promise<Slogan[]> {
    return this.slogansRepository.find({
      order: {
        likes: 'DESC',
      },
    });
  }

  findOne(id: number): Promise<Slogan> {
    return this.slogansRepository.findOneBy({ id });
  }

  async create(
    createSloganDto: CreateSloganDto,
  ): Promise<Slogan | { error: string }> {
    const sloganCount = await this.slogansRepository.count();
    if (sloganCount > 50) {
      return { error: 'Only 50 slogans are allowed' };
    }
    const newSlogan = this.slogansRepository.create({
      slogan: createSloganDto.slogan,
      likes: 0,
    });
    const { id, ...sanitizedSlogan } = newSlogan;
    updateJsonFile('slogans', sanitizedSlogan);
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
