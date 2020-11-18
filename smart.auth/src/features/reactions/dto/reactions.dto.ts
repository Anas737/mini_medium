import { ListDTO } from 'src/features/dto';
import { ReactionDTO } from './reaction.dto';

export interface ReactionsDTO extends ListDTO {
  'hydra:member': ReactionDTO[];
}
