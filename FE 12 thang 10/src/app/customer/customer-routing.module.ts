import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateCustomerComponent} from './component/create-customer/create-customer.component';


const routes: Routes = [ {
  path: 'customer/create', component: CreateCustomerComponent
},
  {
    path: 'customer/edit/:id', component: CreateCustomerComponent
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
