import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IBook} from '../../model/book/IBook';
import {BookService} from '../../service/book/book.service';
import {CartService} from '../../service/cart/cart.service';
import {ToastrModule, ToastrService} from 'ngx-toastr';
import {CategoryService} from '../../service/category/category.service';
import {ICategory} from '../../model/book/ICategory';
import {TokenStorageService} from '../../service/security/token-storage.service';


@Component({
  selector: 'app-description-detail-book',
  templateUrl: './description-detail-book.component.html',
  styleUrls: ['./description-detail-book.component.css']
})
export class DescriptionDetailBookComponent implements OnInit {
  books: IBook = {};
  listCategory: ICategory[] = [];
  itemInCart: number;
  id: number;
  showAdminBoard = false;
  showUserBoard = false;
  isLoggedIn = false;
  idToTakeListCart: number;
  private roles: string[];
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private cartService: CartService,
              private toastr: ToastrService,
              private categoryService: CategoryService,
              private tokenStorageService: TokenStorageService
              ) { }

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
    this.start();
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.id = Number(paramMap.get('id'));
      this.bookService.findBookById(this.id).subscribe(data => {
          this.books = data;
        }
        ,
        (error) => {
          // if (error.status === 404) {
          //   this.router.navigateByUrl('/error404');
          // }
          console.log(error);
        });
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
  start() {
    // window.location.replace('book/des');
    // this.router.navigateByUrl('book/des');
    //   window.location.assign('/book/des');
      init_reload();
      function init_reload() {
        setInterval( function() {
          window.location.reload();

        }, 10800);
      }
  }

  addBookCart(b: IBook) {
    if (this.showUserBoard && !this.showAdminBoard) {
      console.log('account id :' + this.tokenStorageService.getUser().account.accountId);
      this.cartService.addBookIntoCart(b, this.idToTakeListCart).subscribe(data => {
        },
        error => {
          console.log(error);
          this.toastr.error('Số lượng không đủ trong kho!', 'Thông báo ');
        },
        () => {
          this.toastr.success('Thêm vào giỏ thành công!', 'Thông báo ');
        });
    } else {
      this.cartService.addItem(b);
      this.toastr.success('Thêm vào giỏ thành công!', 'Thông báo ');
    }

    // this.cartService.addItem(b);
    // this.toastr.success('Thêm vào giỏ thành công!', 'Thông báo ');
  }
  getListCategory() {
    this.categoryService.getListCategory().subscribe(
      (data ) => {
        this.listCategory = data;
        console.log('cate:');
        console.log(this.listCategory);
      });
  }
}
