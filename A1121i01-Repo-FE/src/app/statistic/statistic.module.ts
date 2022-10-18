import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {StatisticRoutingModule} from './statistic-routing.module';
import {MaterialStatisticComponent} from './material-statistic/material-statistic.component';
import {CustomerStatisticComponent} from './customer-statistic/customer-statistic.component';
import {FinancialStatisticComponent} from './financial-statistic/financial-statistic.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [MaterialStatisticComponent, CustomerStatisticComponent, FinancialStatisticComponent],
  exports: [
    MaterialStatisticComponent,
    FinancialStatisticComponent,
    CustomerStatisticComponent
  ],
  imports: [
    CommonModule,
    StatisticRoutingModule,
    HttpClientModule,
    FormsModule
  ]
})
export class StatisticModule { }
