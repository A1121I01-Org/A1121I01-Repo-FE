import { Component, OnInit } from '@angular/core';
import {ICategory} from '../model/book/ICategory';
import {BookService} from '../service/book/book.service';
import {TokenStorageService} from '../service/security/token-storage.service';
import {CartService} from '../service/cart/cart.service';
import {CategoryService} from '../service/category/category.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-navmenu',
  templateUrl: './navmenu.component.html',
  styleUrls: ['./navmenu.component.css']
})
export class NavmenuComponent implements OnInit {
  listCategory: ICategory[] = [];
  itemInCart: number;
  name = '';
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
              private cartService: CartService,
              private categoryService: CategoryService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.idToTakeListCart = this.tokenStorageService.getUser().account.accountId;
      this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showUserBoard = this.roles.includes('ROLE_USER');
      console.log('roles: ' + this.roles);
    }
    this.getListCategory();
    if (this.showUserBoard) {
      console.log('chua co');
      this.getListCartWithUser();
    } else {
      this.cartService.cartItem.subscribe(d => {
        this.itemInCart = d.length;
      });
    }
  }
  getListCategory() {
    this.categoryService.getListCategory().subscribe(
      (data ) => {
        this.listCategory = data;
        console.log('cate:');
        console.log(this.listCategory);
      });
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

}
