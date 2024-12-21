import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from 'src/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Post } from '../feedback-posts/entities/post.entity';
import { Vote } from '../votes/entities/vote.entity';
import { Category } from '../categories/entities/category.entity';
import { Status } from '../statuses/entities/status.entity';
import { UsersModule } from '../users/users.module';
import { TokenModule } from '../token/token.module';
import { AuthModule } from '../auth/auth.module';
import { PostsModule } from '../feedback-posts/posts.module';
import { StatusModule } from '../statuses/status.module';
import { CategoryModule } from '../categories/category.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService): TypeOrmModuleOptions => ({
        type: 'postgres',
        host: configService.get('db_host'),
        port: +configService.get('db_port'),
        username: configService.get('db_user'),
        password: configService.get('db_password'),
        database: configService.get('db_name'),
        entities: [User, Post, Vote, Category, Status],
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    UsersModule,
    TokenModule,
    AuthModule,
    PostsModule,
    StatusModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
