import { Article } from './article';
import { ListModel, Model } from './model';

export class Tag extends Model {
  id: number;
  title: string;
  draft: boolean;

  articles: string[];

  populatedArticles?: Article[] = [];
}

export class Tags extends ListModel {
  'hydra:member': Tag[];
}
