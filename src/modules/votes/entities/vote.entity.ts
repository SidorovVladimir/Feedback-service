import { Post } from 'src/modules/feedback-posts/entities/post.entity';
import { User } from 'src/modules/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('votes')
export class Vote {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne('User')
  @JoinColumn({ name: 'author_id' })
  user: User;

  @Column()
  author_id: string;

  @ManyToOne('Post')
  @JoinColumn({ name: 'post_id' })
  post: Post;

  @Column()
  post_id: number;

  @CreateDateColumn()
  created_at: string;
}
