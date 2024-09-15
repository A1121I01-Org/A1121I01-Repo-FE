import { Component, OnInit } from '@angular/core';
import {ICustomer} from '../../model/customer/icustomer';
import {StatisticServiceService} from '../../service/statistic/statistic-service.service';
import {ICart} from '../../model/cart/icart';


@Component({
  selector: 'app-customer-statistic',
  templateUrl: './customer-statistic.component.html',
  styleUrls: ['./customer-statistic.component.css']
})
export class CustomerStatisticComponent implements OnInit {
  customers: string[] = [];
  customers1: any[] = [];
  temp: string[] = [];

  constructor(private statisticService: StatisticServiceService) { }

  ngOnInit(): void {
    this.getAllCustomer();
  }

  getAllCustomer() {
    this.statisticService.getAllCustomer().subscribe((data: string[]) => {
      this.customers = data;
      for (let i = 0; i <= data.length; i++) {
        this.temp = data[i].split(',');
        this.customers1.push(this.temp);
      }
    });
  }

}
