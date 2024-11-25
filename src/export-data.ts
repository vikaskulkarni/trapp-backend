import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import { config } from 'dotenv';
import { FriendDetails } from './friends/friend.details.entity';
import { Slogan } from './slogan/slogan.entity';
import * as path from 'path';

config();

const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [FriendDetails, Slogan],
  ssl: {
    rejectUnauthorized: false,
  },
});

async function exportData() {
  await AppDataSource.initialize();

  const friendDetailsRepository = AppDataSource.getRepository(FriendDetails);
  const sloganRepository = AppDataSource.getRepository(Slogan);

  const friendDetails = await friendDetailsRepository.find();
  const slogans = await sloganRepository.find();
  const sanitizedFriendDetails = friendDetails.map(
    ({ email, ...rest }) => rest,
  );

  const sanitizedSlogans = slogans.map(({ id, ...rest }) => rest);

  const data = {
    friendDetails: sanitizedFriendDetails,
    slogans: sanitizedSlogans,
  };

  fs.writeFileSync('data/export4llm.json', JSON.stringify(data, null, 2));

  await AppDataSource.destroy();
}

export function loadJsonData(filePath: string): any {
  const fullPath = path.join(filePath);
  const data = fs.readFileSync(fullPath, 'utf8');
  return JSON.parse(data);
}

exportData().catch((error) => console.log(error));
