import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CreateCustomerComponent } from './component/create-customer/create-customer.component';
import { ListCustomerComponent } from './component/list-customer/list-customer.component';
import { DetailCustomerComponent } from './component/detail-customer/detail-customer.component';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CreateCustomerComponent, ListCustomerComponent, DetailCustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CustomerModule { }
