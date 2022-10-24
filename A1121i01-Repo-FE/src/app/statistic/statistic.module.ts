import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {StatisticRoutingModule} from './statistic-routing.module';
import {MaterialStatisticComponent} from './material-statistic/material-statistic.component';
import {CustomerStatisticComponent} from './customer-statistic/customer-statistic.component';
import {FinancialStatisticComponent} from './financial-statistic/financial-statistic.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [MaterialStatisticComponent, CustomerStatisticComponent, FinancialStatisticComponent],
  exports: [
    MaterialStatisticComponent
  ],
    imports: [
        CommonModule,
        StatisticRoutingModule,
        HttpClientModule,
        ReactiveFormsModule
    ]
})
export class StatisticModule {
}
