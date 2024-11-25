import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

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

  @Column({ nullable: true })
  priceRange: string | null;

  @CreateDateColumn()
  createdAt: Date;
}
