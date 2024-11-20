import { Body, Controller, Get, Post } from '@nestjs/common';
import { FriendDetails } from './friend.details.entity';
import { FriendsService } from './friends.service';
import { FriendDto } from './friendDTO';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  async create(@Body() friend: Partial<FriendDetails>) {
    return this.friendsService.create(friend);
  }

  @Get()
  async findAll(): Promise<FriendDto[]> {
    const friends = await this.friendsService.findAll();
    return friends.map((friend) => ({
      id: friend.id,
      name: friend.name,
      size: friend.size,
      email: friend.email,
    }));
  }
}
