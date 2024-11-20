import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsService } from './friends.service';
import { FriendDetails } from './friend.details.entity';
import { FriendsController } from './friends.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FriendDetails])],
  providers: [FriendsService],
  controllers: [FriendsController],
})
export class FriendsModule {}
