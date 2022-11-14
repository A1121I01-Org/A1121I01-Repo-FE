import {IRole} from './IRole';
import {IAccount} from './IAccount';
import {ICustomer} from '../customer/ICustomer';

export interface ICustomerAccount {
  customer?: ICustomer;
  account?: IAccount;
}
