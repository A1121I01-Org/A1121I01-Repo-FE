import {ICategory} from './ICategory';
import {IPromotion} from './IPromotion';
import {ICustomer} from '../customer/ICustomer';

export interface IBook {
  bookId?: number;
  bookCode?: string;
  bookName?: string;
  bookImage?: string;
  bookContent?: string;
  bookStatus?: boolean;
  bookPrice?: number;
  bookTranslator?: string;
  bookWeight?: string;
  bookPublishDate?: string;
  bookQuantity?: number;
  bookQuantityBuy?: number;
  bookFlag?: boolean;
  bookPublisher?: string;
  bookAuthor?: string;
  bookCategoryId?: ICategory;
  bookPromotionId?: IPromotion;
  bookCustomerId?: ICustomer;
  checked?: boolean;
}
