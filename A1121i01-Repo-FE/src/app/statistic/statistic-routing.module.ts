import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CustomerStatisticComponent} from './customer-statistic/customer-statistic.component';


const routes: Routes = [
  {
    path: 'customer', component: CustomerStatisticComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
