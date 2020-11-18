import { Comment } from './comment';
import { ListModel, Model } from './model';
import { Reaction } from './reaction';
import { Tag } from './tag';
import { User } from './user';

export class Article extends Model {
  id: number;
  name: string;
  reference: string;
  content: string;
  draft: boolean;

  user: string;
  tags: string[];
  reactions: string[];
  comments: string[];

  populatedUser?: User;
  populatedTags?: Tag[] = [];
  populatedReactions?: Reaction[] = [];
  populatedComments?: Comment[] = [];

  createdAt: Date;
  updatedAt: Date;
}

export class Articles extends ListModel {
  'hydra:member': Article[];
}
