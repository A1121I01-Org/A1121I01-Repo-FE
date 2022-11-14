import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DetailCustomerComponent} from './detail-customer/detail-customer.component';
import {CreateCustomerComponent} from './create-customer/create-customer.component';
import {EditCustomerComponent} from './edit-customer/edit-customer.component';
import {ListCusComponent} from './list-cus/list-cus.component';


const routes: Routes = [
  {
    path: 'customer/list', component: ListCusComponent
  },
  {
    path: 'customer/detail', component: DetailCustomerComponent
  },
  {
    path: 'customer/create', component: CreateCustomerComponent
  },
  {
    path: 'customer/edit/:id', component: EditCustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
