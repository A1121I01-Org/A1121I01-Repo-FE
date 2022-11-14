import {Component, OnInit} from '@angular/core';
import {CartService} from './service/cart/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'demologinangular';

  constructor(private cartService: CartService) {
  }
  ngOnInit(): void {
  }
}
