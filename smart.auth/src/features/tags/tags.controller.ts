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
import { TagDTO, TagsDTO } from './dto';
import { TagsServices } from './tags.service';

@Controller('tags')
export class TagsController {
  constructor(private tagsService: TagsServices) {}

  @Get()
  async getTags(@Query() query: any): Promise<TagsDTO> {
    return await this.tagsService.getAll(query);
  }

  @Get(':tagId')
  async getTag(@Param('tagId') tagId: number): Promise<TagDTO> {
    return await this.tagsService.getOne(tagId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createTag(
    @User() user: UserDTO,
    @Body() tagData: TagDTO,
  ): Promise<TagDTO> {
    return await this.tagsService.create(user, tagData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':tagId')
  async updateTag(
    @User() user: UserDTO,
    @Param('tagId') tagId: number,
    @Body() tagData: TagDTO,
  ): Promise<TagDTO> {
    return await this.tagsService.update(user, tagId, tagData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':tagId')
  async deleteTag(
    @User() user: UserDTO,
    @Param('tagId') tagId: number,
  ): Promise<TagDTO> {
    return await this.tagsService.delete(user, tagId);
  }
}
