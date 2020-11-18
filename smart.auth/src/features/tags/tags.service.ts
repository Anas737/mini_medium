import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiService } from 'src/shared/api';
import { UserDTO } from '../user/dto';
import { TagDTO, TagsDTO } from './dto';

@Injectable()
export class TagsServices {
  constructor(private apiService: ApiService) {}

  throwTagDoesntExist() {
    throw new HttpException('Tag does not exist', HttpStatus.NOT_FOUND);
  }

  throwUnauthorizedAction() {
    throw new HttpException(
      'Unauthorized action, this tag does not belong to you',
      HttpStatus.UNAUTHORIZED,
    );
  }

  async getAll(params: any): Promise<TagsDTO> {
    return this.apiService.get('tags', params);
  }

  async getOne(tagId: number): Promise<TagDTO> {
    const tag = await this.apiService.get(`tags/${tagId}`);

    if (tag['hydra:description'] === 'Not Found') this.throwTagDoesntExist();

    return tag;
  }

  async create(user: UserDTO, tagData: TagDTO): Promise<TagDTO> {
    return this.apiService.post('tags', { user: user['@id'], ...tagData });
  }

  async update(user: UserDTO, tagId: number, tagData: TagDTO): Promise<TagDTO> {
    if (!this.isAuthorized(user, tagId)) return;

    return this.apiService.put(`tags/${tagId}`, tagData);
  }

  async delete(user: UserDTO, tagId: number): Promise<TagDTO> {
    if (!this.isAuthorized(user, tagId)) return;

    return this.apiService.delete(`tags/${tagId}`);
  }

  async isAuthorized(user: UserDTO, tagId: number) {
    const tag: TagDTO = await this.getOne(tagId);

    if (tag && tag.user !== user['@id']) {
      this.throwUnauthorizedAction();

      return false;
    }

    return true;
  }
}
