import { Post } from 'src/modules/feedback-posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('statuses')
export class Status {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  name: string;

  @OneToMany('Post', 'status')
  posts: Post[];

  @CreateDateColumn()
  created_at: string;
}
