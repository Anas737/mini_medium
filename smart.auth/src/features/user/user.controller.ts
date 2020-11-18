import { Body, Controller, Delete, Get, Post, UseGuards } from '@nestjs/common';
import { ApiService } from 'src/shared/api';
import { JwtAuthGuard } from '../guards';
import { UserDTO } from './dto';
import { User } from './user.decorator';

@Controller('user')
export class UserController {
  constructor(private apiService: ApiService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUser(@User() user: UserDTO) {
    delete user.password;

    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async updateUser(@User() user: UserDTO, @Body() userData: UserDTO) {
    return await this.apiService.put(`users/${user.id}`, userData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete()
  async deleteUser(@User() user: UserDTO) {
    return await this.apiService.delete(`users/${user.id}`);
  }
}
