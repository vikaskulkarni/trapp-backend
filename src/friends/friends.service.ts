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

  async create(
    friend: Partial<FriendDetails>,
  ): Promise<FriendDetails | { error: string }> {
    const friendCount = await this.friendsRepository.count();
    if (friendCount >= 25) {
      return { error: 'Only 25 friends are allowed' };
    }
    const newFriend = this.friendsRepository.create(friend);
    return this.friendsRepository.save(newFriend);
  }

  findAll(): Promise<FriendDetails[]> {
    return this.friendsRepository.find();
  }
}
