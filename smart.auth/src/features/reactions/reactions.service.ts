import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiService } from 'src/shared/api';
import { UserDTO } from '../user/dto';
import { ReactionDTO, ReactionsDTO } from './dto';

@Injectable()
export class ReactionsService {
  constructor(private apiService: ApiService) {}

  throwReactionDoesntExist() {
    throw new HttpException('Reaction does not exist', HttpStatus.NOT_FOUND);
  }

  throwUnauthorizedAction() {
    throw new HttpException(
      'Unauthorized action, this reaction does not belong to you',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async getAll(params: any): Promise<ReactionsDTO> {
    return this.apiService.get('reactions', params);
  }

  async getOne(reactionId: number): Promise<ReactionDTO> {
    const reaction = await this.apiService.get(`reactions/${reactionId}`);

    if (reaction['hydra:description'] === 'Not Found')
      this.throwReactionDoesntExist();

    return reaction;
  }

  async create(user: UserDTO, reactionData: ReactionDTO): Promise<ReactionDTO> {
    return this.apiService.post('reactions', {
      user: user['@id'],
      ...reactionData,
    });
  }

  async update(
    user: UserDTO,
    reactionId: number,
    reactionData: ReactionDTO,
  ): Promise<ReactionDTO> {
    if (!this.isAuthorized(user, reactionId)) return;

    return this.apiService.put(`reactions/${reactionId}`, reactionData);
  }

  async delete(user: UserDTO, reactionId: number): Promise<ReactionDTO> {
    if (!this.isAuthorized(user, reactionId)) return;

    return this.apiService.delete(`reactions/${reactionId}`);
  }

  async isAuthorized(user: UserDTO, reactionId: number): Promise<boolean> {
    const reaction: ReactionDTO = await this.getOne(reactionId);

    if (reaction && reaction.user !== user['@id']) {
      this.throwUnauthorizedAction();

      return false;
    }

    return true;
  }
}
