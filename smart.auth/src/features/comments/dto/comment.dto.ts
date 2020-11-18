import { DTO } from 'src/features/dto';

export interface CommentDTO extends DTO {
  id: number;
  content: string;
  draft: boolean;

  article: string;
  user: string;

  createdAt: Date;
  updatedAt: Date;
}
