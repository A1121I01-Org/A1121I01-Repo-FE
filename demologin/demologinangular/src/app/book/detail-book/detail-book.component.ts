import { Component, OnInit } from '@angular/core';
import {IBook} from '../../model/book/IBook';
import {CartService} from '../../service/cart/cart.service';
import {BookService} from '../../service/book/book.service';
import {TokenStorageService} from '../../service/security/token-storage.service';
import {ICart} from '../../model/cart/ICart';
import {ToastrService} from 'ngx-toastr';

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
              private tokenStorageService: TokenStorageService,
              private toastr: ToastrService) { }

  ngOnInit(): void {

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
        this.getTotal1(this.itemsCart);
        console.log('total:'+this.total);
      });
    } else {
      console.log('vo day');
      this.getListCard();
      this.getTotal(this.items);
    }
  }

  getListCard() {
    this.cartService.cartItem.subscribe(data => {
      this.items = data;
    });
  }


  onDelete(index: number) {
    this.items.splice(index, 1);
    this.cartService.setCartData(this.items);
    this.getTotal(this.items);
  }

  onDeleteInDB(item: ICart) {
    console.log('cart id: ' + item.cartId);
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
    const qty = +event.target.value;
    console.log('so luong: '+qty);
    if (qty < 1) {
        event.target.value = this.items[index].bookQuantityBuy;
        return;
      }

    this.qtyUpdated(qty, index);
  }
  validateInputCart(event: any, index: number, item: ICart) {
    const qty = +event.target.value;
    console.log(qty);
    console.log('id cart: ' + item.cartId);
    if (this.showUserBoard) {
      console.log('da co');
      const quantity = item.cartQuantity;
      const total = quantity * item.bookPrice;
      const id = item.cartId;
      this.cartService.changeQuantityCart(quantity, total, id).subscribe(
        data => {
        this.getListCartByAccountIdInDB();
      },
        (error => {
          console.log(error);
          this.getListCartByAccountIdInDB();
          this.toastr.error('Số lượng không đủ trong kho!', 'Thông báo ');
        }));
    } else {
      const qty = +event.target.value;
      if (qty < 1) {
        event.target.value = this.items[index].bookQuantityBuy;
        return;
      }
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
  getTotal1(data: any) {
    let subs = 0;
    for (const item of data) {
      subs += (item.bookPrice * item.cartQuantity) -
        ((item.bookPrice * item.cartQuantity) * (item.bookPromotionPercent / 100));
    }
    this.total = subs;
  }



  isAllCheckBoxChecked() {
    if (this.items !== null) {
      console.log(1);
      return this.items.every(p => p.checked);
    }
  }

  checkAllCheckBox(event: any) {
    this.items.forEach(x => x.checked = event.target.checked);
  }
}
