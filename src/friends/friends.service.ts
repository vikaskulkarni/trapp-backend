import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FriendDetails } from './friend.details.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(FriendDetails)
    private friendsRepository: Repository<FriendDetails>,
  ) {}

  create(friend: Partial<FriendDetails>): Promise<FriendDetails> {
    const newFriend = this.friendsRepository.create(friend);
    return this.friendsRepository.save(newFriend);
  }

  findAll(): Promise<FriendDetails[]> {
    return this.friendsRepository.find();
  }
}
