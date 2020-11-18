import { ListModel } from './model';
import { User } from './user';

export class Profiles extends ListModel {
  'hydra:member': User[];
}
