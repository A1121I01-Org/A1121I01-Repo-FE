import { Component, OnInit } from '@angular/core';
import {ICustomer} from '../../model/customer/icustomer';
import {StatisticServiceService} from '../../service/statistic/statistic-service.service';
import {ICart} from '../../model/cart/icart';
import {FormControl, FormGroup} from '@angular/forms';


@Component({
  selector: 'app-customer-statistic',
  templateUrl: './customer-statistic.component.html',
  styleUrls: ['./customer-statistic.component.css']
})
export class CustomerStatisticComponent implements OnInit {
  customers: string[] = [];
  customers1: any[] = [];
  temp: string[] = [];
  formSearch: FormGroup;
  // page = 1;
  // size: number;
  // totalItems: number;

  constructor(private statisticService: StatisticServiceService) { }

  ngOnInit(): void {
    this.formSearch = new FormGroup({
      fromMonth : new FormControl(''),
      toMonth : new FormControl(''),
      year : new FormControl('')
    });
    this.getAllCustomer();
  }

  getAllCustomer() {
//    this.page = page;
    this.statisticService.getAllCustomer().subscribe((data: string[]) => {
      // console.log(data);
      // this.size = data.size;
      // this.totalItems = data.totalElements;
      // this.customers = data.content;
      for (let i = 0; i <= data.length; i++) {
        this.temp = data[i].split(',');
        this.customers1.push(this.temp);
      }
    });
  }

  exportPDF(): void {
    console.log('PDF');
    this.statisticService.getPDF().subscribe(x => {
      const blob = new Blob([x], {type: 'application/pdf'});
      if (window.navigator && window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(blob);
        return;
      }
      const data = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = data;
      link.download = 'statistic-material.pdf';
      link.dispatchEvent(new MouseEvent('click' , {bubbles: true, cancelable: true, view: window}));
      // tslint:disable-next-line:only-arrow-functions
      setTimeout(function() {
        window.URL.revokeObjectURL(data);
        link.remove();
      }, 100);
    });
  }

  search() {
    this.statisticService.searchStatisticCustomer(
      this.formSearch.get('fromMonth').value,
      this.formSearch.get('toMonth').value,
      this.formSearch.get('year').value,
    ).subscribe(
      (data) => {
        this.customers = [];
        this.customers1 = [];
        this.customers = data;
        for (let i = 0; i <= data.length; i++) {
          this.temp = data[i].split(',');
          this.customers1.push(this.temp);
        }
        console.log(this.customers);
        this.ngOnInit();
      }
    );
  }

}
