import { Injectable } from '@angular/core';
import {IBook} from '../../model/book/IBook';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // cartItem = [];
  placeholder = [];
  cartItem = new BehaviorSubject([]);
  itemInCart: number;
  constructor() {
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
      exist.bookQuantity++;
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

  findCartByid(id: number) {
    const ls = this.getCartData();
    let exist: IBook;

    if (ls) {
      exist = ls.find((item) => {
        return item.bookId === id;
      });
    }
  }
}
