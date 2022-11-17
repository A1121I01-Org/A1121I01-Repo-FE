import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {IBook} from '../../model/book/IBook';
import {BookService} from '../../service/book/book.service';
import {CartService} from '../../service/cart/cart.service';

@Component({
  selector: 'app-description-detail-book',
  templateUrl: './description-detail-book.component.html',
  styleUrls: ['./description-detail-book.component.css']
})
export class DescriptionDetailBookComponent implements OnInit {
  books: IBook = {};
  itemInCart: number;
  id: number;
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private bookService: BookService,
              private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.cartItem.subscribe(d => {
      this.itemInCart = d.length;
    });
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
  start() {
    // window.location.replace('book/des');
    // this.router.navigateByUrl('book/des');
    //   window.location.assign('/book/des');
      init_reload();
      function init_reload() {
        setInterval( function() {
          window.location.reload();

        }, 6800);
      }
  }

  addBookCart(b: IBook) {
    this.cartService.addItem(b);
  }
}
