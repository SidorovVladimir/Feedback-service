import { Post } from 'src/modules/feedback-posts/entities/post.entity';
import { Vote } from 'src/modules/votes/entities/vote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text')
  password: string;

  @OneToMany('Post', 'user')
  posts: Post[];

  @OneToMany('Vote', 'user')
  votes: Vote[];

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
