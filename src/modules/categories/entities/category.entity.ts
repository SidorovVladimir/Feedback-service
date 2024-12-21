import { Post } from 'src/modules/feedback-posts/entities/post.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text', { unique: true })
  name: string;

  @OneToMany('Post', 'category')
  posts: Post[];

  @CreateDateColumn()
  created_at: string;
}
