import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiService } from 'src/shared/api';
import { UserDTO } from '../user/dto';
import { CommentDTO, CommentsDTO } from './dto';

@Injectable()
export class CommentsService {
  constructor(private apiService: ApiService) {}

  throwCommentDoesntExist() {
    throw new HttpException('Article does not exist', HttpStatus.NOT_FOUND);
  }

  throwUnauthorizedAction() {
    throw new HttpException(
      'Unauthorized action, this comment does not belong to you',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async getAll(params: any): Promise<CommentsDTO> {
    return this.apiService.get('comments', params);
  }

  async getOne(commentId: number): Promise<CommentDTO> {
    const comment = await this.apiService.get(`comments/${commentId}`);

    if (comment['hydra:description'] === 'Not Found')
      this.throwCommentDoesntExist();

    return comment;
  }

  async create(user: UserDTO, commentData: CommentDTO): Promise<CommentDTO> {
    return this.apiService.post('comments', {
      user: user['@id'],
      ...commentData,
    });
  }

  async update(
    user: UserDTO,
    commentId: number,
    commentData: CommentDTO,
  ): Promise<CommentDTO> {
    const isToDelete = false;

    if (!this.isAuthorized(user, commentId, isToDelete)) return;

    return this.apiService.put(`comments/${commentId}`, commentData);
  }

  async delete(user: UserDTO, commentId: number): Promise<CommentDTO> {
    const isToDelete = true;

    if (!this.isAuthorized(user, commentId, isToDelete)) return;

    return this.apiService.delete(`comments/${commentId}`);
  }

  async isAuthorized(
    user: UserDTO,
    commentId: number,
    isToDelete: boolean,
  ): Promise<boolean> {
    let comment: CommentDTO = null;

    const admin = 'admin';

    if (user.role === admin && isToDelete) {
      return false;
    } else if (user.role !== admin) {
      comment = await this.getOne(commentId);
    }

    if (comment && comment.user !== user['@id']) {
      this.throwUnauthorizedAction();

      return false;
    }

    return true;
  }
}
