import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { DetailCustomerComponent } from './detail-customer/detail-customer.component';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';

import { ListCusComponent } from './list-cus/list-cus.component';

@NgModule({
  declarations: [DetailCustomerComponent, CreateCustomerComponent, EditCustomerComponent, ListCusComponent],
  exports: [
    DetailCustomerComponent,
    ListCusComponent,
    CreateCustomerComponent,
    DetailCustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
