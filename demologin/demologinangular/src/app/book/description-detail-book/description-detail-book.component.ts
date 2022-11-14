import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-description-detail-book',
  templateUrl: './description-detail-book.component.html',
  styleUrls: ['./description-detail-book.component.css']
})
export class DescriptionDetailBookComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.start();
  }
  start() {
    // window.location.replace('book/des');
    // this.router.navigateByUrl('book/des');
    //   window.location.assign('/book/des');
      init_reload();
      function init_reload() {
        setInterval( function() {
          window.location.reload();

        }, 4800);
      }
  }

}
