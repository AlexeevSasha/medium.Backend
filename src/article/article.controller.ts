import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { AuthGuard } from '../user/guards/auth.guard';
import { User } from '../user/decorators/user.decorator';
import { UserEntity } from '../user/user.entity';
import { CreateArticleDto } from './dto/createArticle.dto';
import { IArticlesResponse } from './interfaces/articles.response';

@Controller('articles')
export class ArticleController {
  constructor(private readonly articlesService: ArticleService) {}

  @Get()
  async findAll(@User('id') id: string, @Query() query: any): Promise<any> {
    return await this.articlesService.findAll(id, query);
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @UseGuards(AuthGuard)
  async create(
    @User() user: UserEntity,
    @Body('article') article: CreateArticleDto,
  ): Promise<IArticlesResponse> {
    return {
      article: await this.articlesService.createArticle(user, article),
    };
  }

  @Get(':slug')
  async getSingleArticle(
    @Param('slug') slug: string,
  ): Promise<IArticlesResponse> {
    return {
      article: await this.articlesService.findBySlug(slug),
    };
  }

  @Delete(':slug')
  @UseGuards(AuthGuard)
  async deleteArticle(@User('id') id: string, @Param('slug') slug: string) {
    return await this.articlesService.deleteArticle(slug, id);
  }

  @Put(':slug')
  @UseGuards(AuthGuard)
  async updateArticle(
    @User('id') id: string,
    @Param('slug') slug: string,
    @Body('article') updateArticle: CreateArticleDto,
  ): Promise<IArticlesResponse> {
    return {
      article: await this.articlesService.updateArticle(
        slug,
        updateArticle,
        id,
      ),
    };
  }
}
