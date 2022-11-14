import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-customer',
  templateUrl: './detail-customer.component.html',
  styleUrls: ['./detail-customer.component.css']
})
export class DetailCustomerComponent implements OnInit {
  display: string;
  constructor() { }

  ngOnInit(): void {

  }
  start() {
    const tabBtn = document.querySelectorAll(".tab");
    const tab = document.querySelectorAll(".tabShow");

    function tabs(panalIndex) {
      tab.forEach(function (node) {
        // node.style.display = "none";
        this.display = 'none';
      });
      this.display = 'block';
      // tab[panalIndex].style.display = "block";
    }
    tabs(0);
  }

  tabs1() {

  }
}
