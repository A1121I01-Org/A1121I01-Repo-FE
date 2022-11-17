import {ICartStatus} from './ICartStatus';
import {IAccount} from '../account/IAccount';
import {ICustomer} from '../customer/ICustomer';

export interface ICart {
  cartId: number;
  cartCode: string;
  bookName: string;
  bookImage: string;
  bookPublisher: string;
  bookTranslator: string;
  bookPrice: number;
  bookPromotionPercent: number;
  cartQuantity: number;
  cartTotalMoney: number;
  cartDateCreate: string;
  cartStatusId: ICartStatus;
  cartAccountId: IAccount;
  cartCustomerId: ICustomer;
  checked?: boolean;

}
