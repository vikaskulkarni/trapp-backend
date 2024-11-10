import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from './friend.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private friendsRepository: Repository<Friend>,
  ) {}

  create(friend: Partial<Friend>): Promise<Friend> {
    const newFriend = this.friendsRepository.create(friend);
    return this.friendsRepository.save(newFriend);
  }

  findAll(): Promise<Friend[]> {
    return this.friendsRepository.find();
  }
}
