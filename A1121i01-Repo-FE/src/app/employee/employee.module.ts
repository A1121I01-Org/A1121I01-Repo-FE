import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {DetailEmployeeComponent} from './detail-employee/detail-employee.component';
import {AdminEditEmployeeComponent} from './admin-edit-employee/admin-edit-employee.component';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {AccountModule} from '../account/account.module';


@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [EditEmployeeComponent, ListEmployeeComponent, CreateEmployeeComponent, DetailEmployeeComponent, AdminEditEmployeeComponent],
  exports: [
    DetailEmployeeComponent,
    ListEmployeeComponent,
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    AccountModule
  ]
})
export class EmployeeModule {
}
