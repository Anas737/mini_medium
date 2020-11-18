import { ArticleDTO } from 'src/features/articles/dto';
import { CommentDTO } from 'src/features/comments/dto';
import { DTO } from 'src/features/dto';
import { ReactionDTO } from 'src/features/reactions/dto';

export interface UserDTO extends DTO {
  id: number;
  username: string;
  email: string;
  password: string;
  role: string;

  articles: string[];
  reactions: string[];
  comments: string[];

  createdAt: Date;
  updatedAt: Date;
}
