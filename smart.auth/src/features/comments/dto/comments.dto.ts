import { ListDTO } from 'src/features/dto';

export interface CommentsDTO extends ListDTO {
  'hydra:member': CommentsDTO[];
}
