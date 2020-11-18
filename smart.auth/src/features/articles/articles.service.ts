import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiService } from 'src/shared/api';
import { UserDTO } from '../user/dto';
import { ArticleDTO, ArticlesDTO } from './dto';

@Injectable()
export class ArticlesService {
  constructor(private apiService: ApiService) {}

  throwArticleDoesntExist() {
    throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
  }

  throwUnauthorizedAction() {
    throw new HttpException(
      'Unauthorized action, this article does not belong to you',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async getAll(query: any): Promise<ArticlesDTO> {
    return this.apiService.get('articles', query);
  }

  async getOne(articleId: number): Promise<ArticleDTO> {
    const article = await this.apiService.get(`articles/${articleId}`);

    if (article['hydra:description'] === 'Not Found')
      this.throwArticleDoesntExist();

    return article;
  }

  async create(user: UserDTO, articleData: ArticleDTO): Promise<ArticleDTO> {
    return this.apiService.post('articles', {
      user: user['@id'],
      ...articleData,
    });
  }

  async update(
    user: UserDTO,
    articleId: number,
    articleData: ArticleDTO,
  ): Promise<ArticleDTO> {
    const isToDelete = false;

    if (!this.isAuthorized(user, articleId, isToDelete)) return;

    return this.apiService.put(`articles/${articleId}`, articleData);
  }

  async delete(user: UserDTO, articleId: number): Promise<ArticleDTO> {
    const isToDelete = true;

    if (!this.isAuthorized(user, articleId, isToDelete)) return;

    return this.apiService.delete(`articles/${articleId}`);
  }

  async isAuthorized(
    user: UserDTO,
    articleId: number,
    isToDelete: boolean,
  ): Promise<boolean> {
    let article: ArticleDTO = null;

    const admin = 'admin';

    if (user.role === admin && isToDelete) {
      return false;
    } else if (user.role !== admin) {
      article = await this.getOne(articleId);
    }

    if (article && article.user !== user['@id']) {
      this.throwUnauthorizedAction();

      return false;
    }

    return true;
  }
}
