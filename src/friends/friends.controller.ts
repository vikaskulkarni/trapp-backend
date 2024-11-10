import { Body, Controller, Get, Post } from '@nestjs/common';
import { Friend } from './friend.entity';
import { FriendsService } from './friends.service';

@Controller('friends')
export class FriendsController {
  constructor(private readonly friendsService: FriendsService) {}

  @Post()
  async create(@Body() friend: Partial<Friend>) {
    return this.friendsService.create(friend);
  }

  @Get()
  async findAll(): Promise<Friend[]> {
    return this.friendsService.findAll();
  }
}
