import {ICategory} from './ICategory';
import {IPromotion} from './IPromotion';

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
  bookFlag?: boolean;
  bookPublisher?: string;
  bookAuthor?: string;
  bookCategoryId?: ICategory;
  bookPromotionId?: IPromotion;
  checked?: boolean;
}
