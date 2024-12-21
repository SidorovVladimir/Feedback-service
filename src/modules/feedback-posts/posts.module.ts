import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { StatusModule } from '../statuses/status.module';
import { CategoryModule } from '../categories/category.module';

@Module({
  imports: [TypeOrmModule.forFeature([Post]), StatusModule, CategoryModule],
  providers: [PostsService],
  controllers: [PostsController],
})
export class PostsModule {}
