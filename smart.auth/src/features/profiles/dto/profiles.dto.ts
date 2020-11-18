import { ListDTO } from 'src/features/dto';
import { UserDTO } from 'src/features/user/dto';

export interface ProfilesDTO extends ListDTO {
  'hydra:member': UserDTO[];
}
