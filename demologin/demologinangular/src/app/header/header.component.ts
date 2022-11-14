import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../service/security/token-storage.service';
import {Router} from '@angular/router';
import {IBook} from '../model/book/IBook';
import {BookService} from '../service/book/book.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  listBook: IBook[] = [];
  page = 1;
  size: number;
  totalItems: number;
  private roles: string[];
  isLoggedIn = false;
  userName: string;
  showAdminBoard = false;
  nameBookToSearch: any;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private bookService: BookService) { }

  ngOnInit(): void {
    // this.start();
    this.search();
    console.log(1);
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      this.userName = this.tokenStorageService.getUser().account.username;
      this.roles = this.tokenStorageService.getUser().account.roles[0].roleName;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');


      console.log('roles: ' + this.roles);
    }
  }
  start() {
    window.location.assign('');
    init_reload();
    function init_reload() {
      setInterval( function() {
        window.location.reload();

      }, 30000);
    }

  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.assign('');
    this.router.navigateByUrl('');
  }

  search() {
    // console.log(this.nameBookToSearch);
    // this.bookService.getListBook().subscribe(
    //   (data ) => {
    //     this.listBook = data;
    //     this.listBook1 = this.listBook.slice(0, 1);
    //     console.log(this.listBook1);
    //     this.tokenStorageService.saveBookNameToSearch(this.nameBookToSearch);
    //     this.tokenStorageService.saveBookNameToSearch(this.listBook);
    //     // console.log(this.listBook1.value);
    //   });
    // if (this.nameBookToSearch == '') {
    //   this.tokenStorageService.removeBookToSearch();
    // } else {
    //   this.bookService.searchBookByName(this.nameBookToSearch, 0).subscribe((data) => {
    //     this.listBook = data;
    //     console.log(this.listBook);
    //     if (data.length == 0) {
    //       this.tokenStorageService.removeBookToSearch();
    //     } else {
    //       this.tokenStorageService.saveBookNameToSearch(this.nameBookToSearch);
    //       this.tokenStorageService.saveBookNameToSearch(data);
    //     }
    //   });

      if (this.nameBookToSearch == '') {
        this.tokenStorageService.saveBookNameToSear('none');
      } else {
        this.tokenStorageService.saveBookNameToSear(this.nameBookToSearch);
    }
  }

}
