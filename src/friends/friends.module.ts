import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendsService } from './friends.service';
import { Friend } from './friend.entity';
import { FriendsController } from './friends.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Friend])],
  providers: [FriendsService],
  controllers: [FriendsController],
})
export class FriendsModule {}
