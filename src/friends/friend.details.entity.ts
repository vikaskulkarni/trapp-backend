import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class FriendDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  size: string;

  @Column()
  email: string;
}
