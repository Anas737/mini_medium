import { DTO } from 'src/features/dto';

export interface ReactionDTO extends DTO {
  id: number;
  type: string;
  draft: boolean;

  article: string;
  user: string;

  createdAt: Date;
  updatedAt: Date;
}
