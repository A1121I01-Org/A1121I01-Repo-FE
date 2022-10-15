import { Component, OnInit } from '@angular/core';

import {Router} from '@angular/router';
import {FormControl, FormGroup} from '@angular/forms';
import {ICustomer} from '../../model/customer/icustomer';
import {CustomerServiceService} from '../../service/customer/customer-service.service';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {
  listCustomer: ICustomer[];
  listCustomerNotPagination: ICustomer[];
  totalPagination: Array<number>;
  page = 0;
  name: any;
  id: any;
  searchNameAndPhoneForm: FormGroup;

  constructor(private customerService: CustomerServiceService,
              private route: Router) { }
    // HieuNT setPage for pagination
  setPage(i, event: any) {
    event.preventDefault();
    this.page = i * 5;
    this.getAllCustomerWithPagination();
  }
  ngOnInit(): void {
    this.getAllCustomer();
    this.getAllCustomerWithPagination();
    this.searchNameAndPhoneForm = new FormGroup({
      name: new FormControl(''),
      phone: new FormControl('')
    });
  }
  // HieuNT get list customer without pagination
  getAllCustomer() {
    this.customerService.getAllCustomer().subscribe(
      (data) => {
        this.listCustomerNotPagination = data;
        console.log(Math.round(this.listCustomerNotPagination.length / 5));
        if ((this.listCustomerNotPagination.length % 5) !== 0) {
              this.totalPagination = new Array((Math.round(this.listCustomerNotPagination.length / 5)) + 1 );
            }
        // this.totalPagination = new Array(data.length);
        console.log(data.length);
      });
  }
  // HieuNT get list customer with pagination
  getAllCustomerWithPagination() {
    this.customerService.getAllCustomerWithPagination(this.page).subscribe(
      (data) => {
        this.listCustomer = data;
        // this.totalPagination = new Array(data.length);
        console.log(data.length);
      });
  }

  previous(event: any) {
    event.preventDefault();
    console.log(this.page);
    if (this.page <= 0) {
      this.page = 0;
      this.getAllCustomerWithPagination();
    } else {
      this.page = this.page - 5;
      this.customerService.getAllCustomerWithPagination(this.page).subscribe((data: ICustomer[]) => {
        this.listCustomer = data;
      });
    }
  }

  next(event: any) {
    event.preventDefault();
    this.page = this.page + 5;
    console.log(Math.round(this.totalPagination.length) * 5);
    if (this.page >= Math.round(this.totalPagination.length) * 5) {
      this.page = this.page - 5;
    }
    this.customerService.getAllCustomerWithPagination(this.page).subscribe((data: ICustomer[]) => {
      this.listCustomer = data;
    });
  }
  deleteCustomerById(id: number) {
    this.customerService.deleteCustomerById(id).subscribe(
      () => {},
      () => {},
      () => {
        this.getAllCustomerWithPagination();
      }
    );
  }

  sendCustomerToDelete(customerId: number, customerName: string) {
    this.name = customerName;
    this.id = customerId;
  }

  send() {
    if (this.searchNameAndPhoneForm.get('name').value == '' && this.searchNameAndPhoneForm.get('phone').value == ''){
      this.page = 0;
      this.getAllCustomerWithPagination();
    } else {
      this.customerService.searchCustomerByNameAndPhone(this.searchNameAndPhoneForm.get('name').value,
        this.searchNameAndPhoneForm.get('phone').value ).subscribe(
        (data) => {
          this.listCustomer = data;
      },
        () => {},
        () => {
        });
    }
  }
}
