import { ListDTO } from 'src/features/dto';
import { ArticleDTO } from './article.dto';

export interface ArticlesDTO extends ListDTO {
  'hydra:member': ArticleDTO[];
}
