import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StatisticRoutingModule } from './statistic-routing.module';
import { MaterialStatisticComponent } from './material-statistic/material-statistic.component';
import { CustomerStatisticComponent } from './customer-statistic/customer-statistic.component';
import { FinancialStatisticComponent } from './financial-statistic/financial-statistic.component';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [MaterialStatisticComponent, CustomerStatisticComponent, FinancialStatisticComponent],
  exports: [
    CustomerStatisticComponent
  ],
    imports: [
        CommonModule,
        StatisticRoutingModule,
        FormsModule
    ]
})
export class StatisticModule { }
