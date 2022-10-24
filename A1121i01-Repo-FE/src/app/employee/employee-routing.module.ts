import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AdminEditEmployeeComponent} from './admin-edit-employee/admin-edit-employee.component';
import {CreateEmployeeComponent} from './create-employee/create-employee.component';
import {DetailEmployeeComponent} from './detail-employee/detail-employee.component';
import {ListEmployeeComponent} from './list-employee/list-employee.component';
import {EditEmployeeComponent} from './edit-employee/edit-employee.component';


const routes: Routes = [
  {
    path: 'employee/list', component: ListEmployeeComponent
  },
  {
    path: 'employee/detail/:id', component: DetailEmployeeComponent
  },
  {
    path: 'employee/edit', component: EditEmployeeComponent
  },
  {path: 'product/create', component: CreateEmployeeComponent},
  {path: 'product/edit/:id', component: AdminEditEmployeeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
