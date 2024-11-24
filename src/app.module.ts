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
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: process.env.DATABASE_URL,
        // host: configService.get('DB_HOST'),
        // port: +configService.get<number>('DB_PORT'),
        // username: configService.get('DB_USERNAME'),
        // password: configService.get('DB_PASSWORD'),
        // database: configService.get('DB_NAME'),
        entities: [FriendDetails, Slogan],
        synchronize: true,
        // ssl: true,
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
