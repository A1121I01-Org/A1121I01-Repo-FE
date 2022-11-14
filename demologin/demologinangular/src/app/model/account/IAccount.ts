import {IRole} from './IRole';

export interface IAccount {
  accountId?: number;
  username?: string;
  password?: string;
  accountFlag?: boolean;
  roles?: IRole;
}
