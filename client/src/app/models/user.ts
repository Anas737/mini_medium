import { Article } from './article';
import { Comments } from './comment';
import { Model } from './model';
import { Reactions } from './reaction';

export class User extends Model {
  id?: number;
  username?: string;
  email: string;
  password: string;
  confirmPassword?: string;
  role?: string;

  articles?: string[];
  reactions?: string[];
  comments?: string[];

  populatedArticles?: Article[] = [];
  populatedReactions?: Reactions[] = [];
  populatedComments?: Comments[] = [];

  createdAt?: Date;
  updatedAt?: Date;

  token?: string;
}
