import { Component, OnInit } from '@angular/core';
import {IBook} from '../../model/book/IBook';
import {CartService} from '../../service/cart/cart.service';
import {BookService} from '../../service/book/book.service';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {ICart} from '../../model/cart/ICart';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit {
  items: IBook[] = [];
  itemsCart: ICart[] = [];
  listCartPayment: IBook[] = [];
  listPayment: number[] = [];
  total: number;
  totalMoney = 0;
  showAdminBoard = false;
  showUserBoard = false;
  isLoggedIn = false;
  private idToTakeListCart: number;
  private roles: string[];
  constructor(private cartService: CartService,
              private bookService: BookService,
              private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    // console.log('hello');
    // this.listCartPayment = this.cartService.findCartById([1]);
    console.log(this.listCartPayment);
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.idToTakeListCart = this.tokenStorageService.getUser().account.accountId;
      this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      console.log('roles: ' + this.roles);
    }
    this.totalMoney = 0;
    this.getListCartByAccountIdInDB();
  }
  getListCartByAccountIdInDB() {
    if (this.showUserBoard) {
      console.log('lay ds cart bang accout id');
      this.cartService.getAllCartWithUser(this.idToTakeListCart).subscribe(data => {
        this.itemsCart = data;
        console.log(data);
      });
    } else {
      this.getListCard();
    }
  }

  getListCard() {
    this.cartService.cartItem.subscribe(data => {
      this.items = data;
      // for (const item of data) {
      //   if (item.bookPromotionId.promotionPercent > 0 ) {
      //     item.bookPrice = item.bookPromotionId.promotionPercent / 100 + item.bookPrice;
      //     this.priceUpdated(item.bookPrice, item);
      //   }
      // }
      console.log('luot mua');
      console.log(this.items[0].bookQuantityBuy);
      this.getTotal(this.items);
    });
  }


  onDelete(index: number) {
    this.items.splice(index, 1);
    this.cartService.setCartData(this.items);
    this.getTotal(this.items);
    // this.checkCartPayment();
  }

  onDeleteInDB(item: ICart) {
    console.log('cart id: '+item.cartId);
    this.cartService.deleteCartByAccountId(item.cartId).subscribe(
      data => {
      this.getListCartByAccountIdInDB();
      console.log('xoa thanh cong');
    },
      (error => {
        console.log(error);
      }));
  }

  validateInput(event: any, index: number) {
    if (this.showUserBoard) {
      console.log('chua co');
    } else {
      const qty = +event.target.value;
      if (qty < 1) {
        event.target.value = this.items[index].bookQuantityBuy;
        return;
      }
      this.checkCartPayment();
      this.qtyUpdated(qty, index);
    }
  }
  private priceUpdated(price: number, index: number) {
    this.items[index].bookPrice = price;
    this.cartService.setCartData(this.items);
  }

  private qtyUpdated(qty: number, index: number) {
    this.items[index].bookQuantityBuy = qty;
    this.cartService.setCartData(this.items);
    this.getTotal(this.items);
  }
  getTotal(data: any) {
    let subs = 0;
    for (const item of data) {
      subs += (item.bookPrice * item.bookQuantityBuy) -
        ((item.bookPrice * item.bookQuantityBuy) * (item.bookPromotionId.promotionPercent / 100));
    }
    this.total = subs;
  }

  checkCartPayment() {
    // const selectedProducts = this.items.filter(cart => cart.checked).map(p => p.bookId);
    // console.log(selectedProducts);
    // this.listPayment = selectedProducts;
    // if (selectedProducts && selectedProducts.length > 0) {
    //   // if (this.listPayment !== null) {
    //   //   this.totalMoney = 0;
    //   //   this.listCartPayment = this.cartService.findCartById(selectedProducts);
    //   //   console.log('hello');
    //   //   console.log( this.listCartPayment);
    //   //   for (let i = 0 ; i < this.listCartPayment.length; i++) {
    //   //     if (this.listCartPayment[i] !== null) {
    //   //       // this.qtyUpdated(this.listCartPayment[i].bookQuantityBuy, i);
    //   //       this.totalMoney = this.totalMoney + this.listCartPayment[i].bookPrice * this.listCartPayment[i].bookQuantityBuy;
    //   //     }
    //   //   }
    //   //   console.log(this.totalMoney);
    //   // }
    //   this.bookService.checkBookCartPayment(this.listPayment).
    //     subscribe(data => {
    //     this.listCartPayment = data;
    //     console.log('check');
    //     console.log(data);
    //     this.totalMoney = 0;
    //     // this.getTotal(this.items);
    //     if (this.listPayment !== null) {
    //       // tslint:disable-next-line:prefer-for-of
    //       for (let i = 0 ; i < this.listCartPayment.length; i++) {
    //         if (this.listCartPayment[i] !== null) {
    //           // this.qtyUpdated(this.listCartPayment[i].bookQuantityBuy, i);
    //           this.totalMoney = this.totalMoney + this.items[i].bookPrice * this.items[i].bookQuantityBuy;
    //         }
    //       }
    //     }
    //   }, error => {
    //       console.log(error);
    //     });
    // } else {
    //   this.listCartPayment = [];
    //   this.ngOnInit();
    // }
  }

  isAllCheckBoxChecked() {
    if (this.items !== null) {
      console.log(1);
      return this.items.every(p => p.checked);
    }
  }

  checkAllCheckBox(event: any) {
    this.items.forEach(x => x.checked = event.target.checked);
    this.checkCartPayment();
  }
}
