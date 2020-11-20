import { Article } from './article';
import { ListModel, Model } from './model';
import { User } from './user';

export class Comment extends Model {
  id?: number;
  content: string;
  draft?: boolean;

  article: string;
  user: string;

  populatedArticle?: Article;
  populatedUser?: User;

  createdAt?: Date;
  updatedAt?: Date;
}

export interface Comments extends ListModel {
  'hydra:member': Comment[];
}
