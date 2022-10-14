import {ICustomer} from '../customer/icustomer';
import {ICartStatus} from './icart-status';

export interface ICart {
  cartId?: number;
  cartCode?: string;
  cartQuantity?: number;
  cartDateCreate?: string;
  cartTotalMoney?: number;
  cartCustomerId?: ICustomer;
  cartStatusId?: ICartStatus;
}
