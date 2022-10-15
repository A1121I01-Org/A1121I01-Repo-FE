import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FinancialStatisticComponent} from './financial-statistic/financial-statistic.component';


const routes: Routes = [
  {
    path: 'financial', component: FinancialStatisticComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
