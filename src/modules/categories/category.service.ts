import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryrepository: Repository<Category>,
  ) {}

  async createCategory(name: string): Promise<Category> {
    try {
      const category = await this.findCategoryByName(name);
      if (category) return category;
      const newCategory = new Category();
      newCategory.name = name;
      await this.categoryrepository.save(newCategory);
      return newCategory;
    } catch (e) {
      throw new Error(e);
    }
  }
  async findCategoryByName(name: string): Promise<Category> {
    return this.categoryrepository.findOne({ where: { name } });
  }
}
