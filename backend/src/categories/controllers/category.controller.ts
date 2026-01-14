import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CategoryService } from '../services/category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async createCategory(@Body('name') name: string) {
    return this.categoryService.create(name);
  }

  @Get()
  async getCategoriestWithLimit(@Query('limit') limit: number) {
    return this.categoryService.findWithLimit(limit);
  }

  @Get()
  async getAllCategories() {
    return this.categoryService.findAll();
  }

  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return this.categoryService.delete(id);
  }
}
