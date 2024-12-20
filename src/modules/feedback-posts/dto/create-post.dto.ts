import { IsString } from 'class-validator';

export class CreatePostDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  status: string;

  @IsString()
  category: string;
}
