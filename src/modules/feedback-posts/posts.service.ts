import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { CreatePostDTO } from './dto/create-post.dto';
import { StatusService } from '../statuses/status.service';
import { CategoryService } from '../categories/category.service';
import { UpdatePostDTO } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postsRepository: Repository<Post>,
    private readonly statusService: StatusService,
    private readonly categoryService: CategoryService,
  ) {}

  async createPost(dto: CreatePostDTO, userId: string): Promise<Post> {
    try {
      const status = await this.statusService.createStatus(dto.status);
      const category = await this.categoryService.createCategory(dto.category);
      const newPosts = new Post();
      newPosts.author_id = userId;
      newPosts.title = dto.title;
      newPosts.description = dto.description;
      newPosts.category_id = category.id;
      newPosts.status_id = status.id;
      await this.postsRepository.save(newPosts);
      return newPosts;
    } catch (e) {
      throw new Error(e);
    }
  }

  async getPosts(
    categoryId?: string,
    statusId?: string,
    sortBy?: 'votes' | 'createdAt',
    order?: 'ASC' | 'DESC',
    page?: number,
    limit?: number,
  ): Promise<{ posts: Post[]; total: number }> {
    try {
      const query = await this.postsRepository
        .createQueryBuilder('post')
        .take(limit)
        .skip((page - 1) * limit);

      if (categoryId) {
        query.where('post.category_id = :categoryId', { categoryId });
      }
      if (statusId) {
        query.where('post.status_id = :statusId', { statusId });
      }
      if (sortBy === 'votes') {
        query.orderBy('post.totalVotes', order);
      }
      if (sortBy === 'createdAt') {
        query.orderBy('post.created_at', order);
      }
      const [posts, total] = await query.getManyAndCount();
      return { posts, total };
    } catch (e) {
      throw new Error(e);
    }
  }

  async deletePost(postId: number, userId: string): Promise<void> {
    try {
      await this.postsRepository.delete({ id: postId, author_id: userId });
    } catch (e) {
      throw new Error(e);
    }
  }
  async updatePost(
    dto: UpdatePostDTO,
    postId: number,
    userId: string,
  ): Promise<Post> {
    try {
      const updatePost = await this.postsRepository.findOne({
        where: {
          author_id: userId,
          id: postId,
        },
      });
      if (dto.category) {
        const category = await this.categoryService.createCategory(
          dto.category,
        );
        updatePost.category_id = category.id;
      }

      if (dto.status) {
        const status = await this.statusService.createStatus(dto.status);
        updatePost.status_id = status.id;
      }
      if (dto.title) {
        updatePost.title = dto.title;
      }
      if (dto.description) {
        updatePost.description = dto.description;
      }
      await this.postsRepository.save(updatePost);
      return updatePost;
    } catch (e) {
      throw new Error(e);
    }
  }
}
