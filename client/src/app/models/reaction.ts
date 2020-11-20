import { Article } from './article';
import { ListModel, Model } from './model';
import { User } from './user';

export class Reaction extends Model {
  id?: number;
  type?: string;

  article: string;
  user: string;

  populatedArticle?: Article;
  populatedUser?: User;

  createdAt?: Date;
  updatedAt?: Date;
}

export class Reactions extends ListModel {
  'hydra:member': Reaction[];
}
