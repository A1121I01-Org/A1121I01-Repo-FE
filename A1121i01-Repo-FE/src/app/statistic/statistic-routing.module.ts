import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FinancialStatisticComponent} from './financial-statistic/financial-statistic.component';
import {MaterialStatisticComponent} from './material-statistic/material-statistic.component';
import {CustomerStatisticComponent} from './customer-statistic/customer-statistic.component';


const routes: Routes = [
  {
    path: 'material', component: MaterialStatisticComponent
  },
  {
    path: 'financial', component: FinancialStatisticComponent
  },
  {
    path: 'customer', component: CustomerStatisticComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
