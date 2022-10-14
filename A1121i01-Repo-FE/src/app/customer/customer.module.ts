import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { ListCustomerComponent } from './list-customer/list-customer.component';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {CustomerRoutingModule} from './customer-routing.module';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {ListCustomerComponent} from './list-customer/list-customer.component';
import {DetailCustomerComponent} from './detail-customer/detail-customer.component';
import {HttpClientModule} from '@angular/common/http';


@NgModule({
  declarations: [CreateCustomerComponent, ListCustomerComponent, DetailCustomerComponent],
  exports: [
    DetailCustomerComponent
  ],
  exports: [
    ListCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
    CustomerRoutingModule,
    HttpClientModule
  ]
})
export class CustomerModule { }
