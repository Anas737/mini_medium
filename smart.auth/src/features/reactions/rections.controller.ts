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
import { ReactionDTO, ReactionsDTO } from './dto';
import { ReactionsService } from './reactions.service';

@Controller('reactions')
export class ReactionsController {
  constructor(private reactionsService: ReactionsService) {}

  @Get()
  async getReactions(@Query() params: any): Promise<ReactionsDTO> {
    return await this.reactionsService.getAll(params);
  }

  @Get(':reactionId')
  async getReaction(
    @Param('reactionId') reactionId: number,
  ): Promise<ReactionDTO> {
    return await this.reactionsService.getOne(reactionId);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createReaction(
    @User() user: UserDTO,
    @Body() reactionData: ReactionDTO,
  ): Promise<ReactionDTO> {
    return await this.reactionsService.create(user, reactionData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':reactionId')
  async updateReaction(
    @User() user: UserDTO,
    @Param('reactionId') reactionId: number,
    @Body() reactionData: ReactionDTO,
  ): Promise<ReactionDTO> {
    return await this.reactionsService.update(user, reactionId, reactionData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':reactionId')
  async deleteReaction(
    @User() user: UserDTO,
    @Param('reactionId') reactionId: number,
  ): Promise<ReactionDTO> {
    return await this.reactionsService.delete(user, reactionId);
  }
}
