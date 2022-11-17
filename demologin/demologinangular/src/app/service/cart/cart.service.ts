import { Injectable } from '@angular/core';
import {IBook} from '../../model/book/IBook';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {ICart} from '../../model/cart/ICart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly URL_API_CART_BOOK = 'http://localhost:8080/api/cart';
  // cartItem = [];
  placeholder = [];
  cartItem = new BehaviorSubject([]);
  listCartToSumMoney  = [];
  itemInCart: number;
  constructor(private httpClient: HttpClient) {
    // const ls = JSON.parse(localStorage.getItem('cart'));
    const ls = this.getCartData();
    if (ls) this.cartItem.next(ls);
  }

  addItem(book: IBook) {
    // const ls = JSON.parse(localStorage.getItem('cart'));
    const ls = this.getCartData();
    let exist: IBook;

    if (ls) {
      exist = ls.find((item) => {
        return item.bookId === book.bookId;
      });
    }
    if (exist) {
      // tslint:disable-next-line:no-unused-expression
      exist.bookQuantityBuy = 0;
      exist.bookQuantityBuy++;
      this.setCartData(ls);
      // localStorage.setItem('cart', JSON.stringify(ls));
    } else {
      // this.totalBookCart.push(book);
      // this.numOfItem.next(this.totalBookCart);
      // console.log(this.totalBookCart);
      if (ls) {
        const newData = [...ls, book];
        this.setCartData(newData);
        localStorage.setItem('cart', JSON.stringify(newData));
        // this.numOfItem.next(JSON.parse(localStorage.getItem('cart')));
        this.cartItem.next(this.getCartData());
      } else {
        this.placeholder.push(book);
        this.setCartData(this.placeholder);
        // localStorage.setItem('cart', JSON.stringify(this.placeholder));
        this.cartItem.next(this.getCartData());
      }
    }

  }

  setCartData(data: any) {
    localStorage.setItem('cart', JSON.stringify(data));
  }
  getCartData() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  findCartById(id: number[]) {
    const ls = this.getCartData();
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < ls.length ; i++) {
        if (id[i] == ls[i].bookId ) {
          this.listCartToSumMoney.push(ls[i]);
        }
    }
    return this.listCartToSumMoney;
  }

  addBookIntoCart(iBook: IBook, id: number): Observable<void> {
    // @ts-ignore
    return this.httpClient.post<void>(`${this.URL_API_CART_BOOK}/addBookIntoCart/${id}`, iBook);
  }

  getAllCartWithUser(id: number): Observable<ICart[]> {
    return this.httpClient.get<ICart[]>(`${this.URL_API_CART_BOOK}/list/${id}`);
  }

  deleteCartByAccountId(idCart: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.URL_API_CART_BOOK}/delete/${idCart}`);
  }


}
