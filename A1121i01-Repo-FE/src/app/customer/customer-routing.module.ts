import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ListCustomerComponent} from './list-customer/list-customer.component';
import {DetailCustomerComponent} from './detail-customer/detail-customer.component';
import {CreateCustomerComponent} from './create-customer/create-customer.component';


const routes: Routes = [
  {path: 'customer/list', component: ListCustomerComponent},
  {path: 'customer/detail/:id', component: DetailCustomerComponent},
  {path: 'create', component: CreateCustomerComponent},
  {path: 'edit/:id', component: CreateCustomerComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {
}
