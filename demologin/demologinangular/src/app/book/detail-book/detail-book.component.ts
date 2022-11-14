import { Component, OnInit } from '@angular/core';
import {IBook} from '../../model/book/IBook';
import {CartService} from '../../service/cart/cart.service';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit {
  items: IBook[] = [];
  listPayment: number[] = [];
  total: number;
  totalMoney = 0;
  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItem.subscribe(data => {
      this.items = data;
      this.getTotal(this.items);
    });
  }


  onDelete(index: number) {
    this.items.splice(index, 1);
    this.cartService.setCartData(this.items);
    this.getTotal(this.items);
  }

  validateInput(event: any, index: number) {
    const qty = +event.target.value;
    if (qty < 1) {
      event.target.value = this.items[index].bookQuantity;
      return;
    }
    this.qtyUpdated(qty, index);
  }

  private qtyUpdated(qty: number, index: number) {
    this.items[index].bookQuantity = qty;
    this.cartService.setCartData(this.items);
    this.getTotal(this.items);
  }
  getTotal(data: any) {
    let subs = 0;
    for (const item of data) {
      subs += item.bookPrice * item.bookQuantity;
    }
    this.total = subs;
  }

  checkCartPayment() {
    const selectedProducts = this.items.filter(cart => cart.checked).map(p => p.bookId);
    this.listPayment = selectedProducts;
    if (selectedProducts && selectedProducts.length > 0) {
      this.cartService.cartItem.subscribe(data => {
        this.items = data;
        this.totalMoney = 0;
        // this.getTotal(this.items);
        if (this.listPayment !== null) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0 ; i < this.items.length; i++) {
            if (this.items[i] !== null) {
              this.totalMoney = this.totalMoney + this.items[i].bookPrice;
            }
          }
        }
      }, error => {
          console.log(error);
        });
    } else {
      this.ngOnInit();
    }
  }

  isAllCheckBoxChecked() {
    if (this.items !== null) {
      return this.items.every(p => p.checked);
    }
  }

  checkAllCheckBox(event: any) {
    this.items.forEach(x => x.checked = event.target.checked);
    this.checkCartPayment();
  }
}
