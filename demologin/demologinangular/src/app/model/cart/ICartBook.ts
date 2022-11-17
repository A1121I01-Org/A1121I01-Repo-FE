import {ICart} from './ICart';
import {IBook} from '../book/IBook';

export interface ICartBook {
  cartBookId?: number;
  bookId?: IBook;
  cartId?: ICart;
  cartBookFlag?: boolean;
  cartBookReason?: string;
  checked?: boolean;
}
