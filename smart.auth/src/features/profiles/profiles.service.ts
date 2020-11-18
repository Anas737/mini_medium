import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiService } from 'src/shared/api';
import { UserDTO } from '../user/dto';
import { ProfilesDTO } from './dto';

@Injectable()
export class ProfilesService {
  constructor(private apiService: ApiService) {}

  throwProfileDoesntExist() {
    throw new HttpException('Profile does not exist', HttpStatus.NOT_FOUND);
  }

  async getAll(): Promise<ProfilesDTO> {
    return this.apiService.get('users');
  }

  async getOne(profileId: number): Promise<UserDTO> {
    const profile: UserDTO = await this.apiService.get(`users/${profileId}`);

    if (profile['hydra:description'] === 'Not Found')
      this.throwProfileDoesntExist();

    return profile;
  }
}
