import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MaterialStatisticComponent} from './material-statistic/material-statistic.component';


const routes: Routes = [
  {
    path: 'material', component: MaterialStatisticComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatisticRoutingModule { }
