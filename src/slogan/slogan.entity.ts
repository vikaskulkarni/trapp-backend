import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Slogan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  slogan: string;

  @Column({ default: 0 })
  likes: number;
}
