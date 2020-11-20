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
} from '@nestjs/common';
import { JwtAuthGuard } from '../guards';
import { User } from '../user';
import { UserDTO } from '../user/dto';
import { ArticlesService } from './articles.service';
import { ArticleDTO, ArticlesDTO } from './dto';

@Controller('articles')
export class ArticlesController {
    constructor(private articlesService: ArticlesService) {}

    @Get()
    async getArticles(@Query() params): Promise<ArticlesDTO> {
        return await this.articlesService.getAll(params);
    }

    @Get(':articleId')
    async getArticle(
        @Param('articleId') articleId: number,
    ): Promise<ArticleDTO> {
        return await this.articlesService.getOne(articleId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createArticle(
        @User() user: UserDTO,
        @Body() articleData: ArticleDTO,
    ): Promise<ArticleDTO> {
        console.log(articleData);
        return await this.articlesService.create(user, articleData);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':articleId')
    async updateArticle(
        @User() user: UserDTO,
        @Param('articleId') articleId: number,
        @Body() articleData: ArticleDTO,
    ): Promise<ArticleDTO> {
        return await this.articlesService.update(user, articleId, articleData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':articleId')
    async deleteArticle(
        @User() user: UserDTO,
        @Param('articleId') articleId: number,
    ): Promise<ArticleDTO> {
        return await this.articlesService.delete(user, articleId);
    }
}
