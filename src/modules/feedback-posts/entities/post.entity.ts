import { Category } from 'src/modules/categories/entities/category.entity';
import { Status } from 'src/modules/statuses/entities/status.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Vote } from 'src/modules/votes/entities/vote.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('posts')
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @ManyToOne('User')
  @JoinColumn({ name: 'author_id' })
  user: User;

  @Column()
  author_id: string;

  @OneToMany('Vote', 'post')
  votes: Vote[];

  @ManyToOne('Status')
  @JoinColumn({ name: 'status_id' })
  status: Status;

  @Column()
  status_id: number;

  @ManyToOne('Category')
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: number;

  @Column({ default: 0 })
  totalVotes: number;

  @CreateDateColumn()
  created_at: string;

  @UpdateDateColumn()
  updated_at: string;
}
