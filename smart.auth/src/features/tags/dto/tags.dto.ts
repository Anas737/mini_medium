import { ListDTO } from 'src/features/dto';
import { TagDTO } from './tag.dto';

export interface TagsDTO extends ListDTO {
  'hydra:member': TagDTO[];
}
