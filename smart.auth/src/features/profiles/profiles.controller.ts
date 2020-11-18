import { Controller, Get, Param } from '@nestjs/common';
import { UserDTO } from '../user/dto';
import { ProfilesDTO } from './dto';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}

  @Get()
  async getProfiles(): Promise<ProfilesDTO> {
    return await this.profilesService.getAll();
  }

  @Get(':profileId')
  async getProfile(@Param('profileId') profileId: number): Promise<UserDTO> {
    return await this.profilesService.getOne(profileId);
  }
}
