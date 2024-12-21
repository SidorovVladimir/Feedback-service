import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDTO } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Post as Posts } from './entities/post.entity';
import { UpdatePostDTO } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createPost(
    @Body() createPostDto: CreatePostDTO,
    @Req() request,
  ): Promise<Posts> {
    const user = request.user;
    return this.postsService.createPost(createPostDto, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getPosts(
    @Query('categoryId')
    categoryId?: string,
    @Query('statusId')
    statusId?: string,
    @Query('sortBy') sortBy?: 'votes' | 'createdAt',
    @Query('order') order?: 'ASC' | 'DESC',
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
  ): Promise<{ posts: Posts[]; total: number }> {
    return this.postsService.getPosts(
      categoryId,
      statusId,
      sortBy,
      order,
      page,
      limit,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deletePost(
    @Param('id', ParseIntPipe) postId: number,
    @Req() request,
  ): Promise<void> {
    const user = request.user;
    return this.postsService.deletePost(postId, user.id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updatePost(
    @Param('id', ParseIntPipe) postId: number,
    @Req() request,
    @Body() updatePostDto: UpdatePostDTO,
  ): Promise<Posts> {
    const user = request.user;
    return this.postsService.updatePost(updatePostDto, postId, user.id);
  }
}
