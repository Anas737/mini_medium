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
import { CommentsService } from './comments.service';
import { CommentDTO, CommentsDTO } from './dto';

@Controller('comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get()
    async getComments(@Query() params): Promise<CommentsDTO> {
        return await this.commentsService.getAll(params);
    }

    @Get(':commentId')
    async getComment(
        @Param('commentId') commentId: number,
    ): Promise<CommentDTO> {
        return await this.commentsService.getOne(commentId);
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    async createComment(
        @User() user: UserDTO,
        @Body() commentData: CommentDTO,
    ): Promise<CommentDTO> {
        return await this.commentsService.create(user, commentData);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':commentId')
    async updateComment(
        @User() user: UserDTO,
        @Param('commentId') commentId: number,
        @Body() commentData: CommentDTO,
    ): Promise<CommentDTO> {
        return await this.commentsService.update(user, commentId, commentData);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':commentId')
    async deleteComment(
        @User() user: UserDTO,
        @Param('commentId') commentId: number,
    ): Promise<CommentDTO> {
        return await this.commentsService.delete(user, commentId);
    }
}
