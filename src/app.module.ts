import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FriendsModule } from './friends/friends.module';
import { FriendDetails } from './friends/friend.details.entity';
import { SloganModule } from './slogan/slogan.module';
import { Slogan } from './slogan/slogan.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        entities: [FriendDetails, Slogan],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([FriendDetails, Slogan]),
    FriendsModule,
    SloganModule,
  ],
})
export class AppModule {}
