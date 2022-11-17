import { Component, OnInit } from '@angular/core';
import {IBook} from '../model/book/IBook';
import {BookService} from '../service/book/book.service';
import {TokenStorageService} from '../service/security/token-storage.service';
import {BehaviorSubject} from 'rxjs';
import {CartService} from '../service/cart/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  listBook: IBook[] = [];
  listBookNew1: IBook[] = [];
  listBookNew: IBook[] = [];
  totalBookCart = [];
  // numOfItem = new BehaviorSubject([]);
  itemInCart :number;

  page = 1;
  size: number;
  totalItems: number;
  nameToSearch = '';
  showAdminBoard = false;
  showUserBoard = false;
  isLoggedIn = false;
  idToTakeListCart: number;
  private roles: string[];
  constructor(private bookService: BookService,
              private tokenStorageService: TokenStorageService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.idToTakeListCart = this.tokenStorageService.getUser().account.accountId;
      this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      console.log('roles: ' + this.roles);
    }

    console.log('aloo');
    // this.getItem();
    // this.search();
    // this.nameToSearch =  sessionStorage.getItem('bookName');
    // console.log(this.nameToSearch );
    this.getBookListWithPagination(this.page);
    if (this.showUserBoard) {
      console.log('chua co');
      this.getListCartWithUser();
    } else {
      this.cartService.cartItem.subscribe(d => {
        this.itemInCart = d.length;
      });
    }
  }
  getListCartWithUser() {
    this.cartService.getAllCartWithUser(this.idToTakeListCart).subscribe(data => {
      if (data == null) {
        this.itemInCart = 0;
      } else {
        this.itemInCart = data.length;
      }
    });
  }

  getBook() {
    this.bookService.getListBook().subscribe(
      (data ) => {
        this.listBook = data;
        this.listBookNew = this.listBook.slice(0, 1);
        console.log(this.listBookNew);
        // console.log(this.listBook1.value);
      });
  }
  getBookListWithPagination(page: number) {
    this.page = page;
    this.bookService.findAllCustomer(this.page - 1).subscribe((data: any) => {
        this.listBook = data.content;
        this.size = data.size;
        this.totalItems = data.totalElements;
        console.log(this.totalItems);
        this.listBookNew = this.listBook.slice(0, 1);
        this.listBookNew1 = this.listBook.slice(0, 4);
      },
      () => {
        this.page--;
        this.getBookListWithPagination(this.page);
      }
    );
  }
  search() {
    if (this.nameToSearch == '' || this.nameToSearch == 'none') {
      this.ngOnInit();
    } else {
      this.bookService.searchBookByName(this.nameToSearch, this.page-1).subscribe((data: any) => {
        this.listBook = data.content;
        this.size = data.size;
        this.totalItems = data.totalElements;
        console.log('neu co vo day');
        console.log(this.page);
        console.log(this.nameToSearch);
        console.log(this.listBook);
      });
    }
  }
  getItem() {
    return  sessionStorage.getItem('bookName');
  }


  addBookCart(b: IBook) {
    // console.log( this.tokenStorageService.getUser().account.username);
    // console.log(b.bookCustomerId.customerAccountId.accountId);
    // console.log(b.bookCustomerId.customerAccountId.username);
    console.log(b.bookName);
    console.log(b);
    console.log(this.tokenStorageService.getUser().account.accountId);
    if (this.showUserBoard && !this.showAdminBoard) {
      console.log('account id :' + this.tokenStorageService.getUser().account.accountId);
      this.cartService.addBookIntoCart(b, this.idToTakeListCart).subscribe(data => {
        alert('them thanh cong');
        this.getListCartWithUser();
        this.getBookListWithPagination(this.page);
      });
    } else {
      this.cartService.addItem(b);
    }
  }


}
