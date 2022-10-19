import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { MaterialStatisticComponent } from './material-statistic/material-statistic.component';
import { CustomerStatisticComponent } from './customer-statistic/customer-statistic.component';
import { FinancialStatisticComponent } from './financial-statistic/financial-statistic.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
  declarations: [MaterialStatisticComponent, CustomerStatisticComponent, FinancialStatisticComponent],
  exports: [
    CustomerStatisticComponent
  ],
    imports: [
        CommonModule,
        StatisticRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        NgxPaginationModule
    ]
})
export class StatisticModule { }
