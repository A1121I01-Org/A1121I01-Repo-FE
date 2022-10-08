import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DetailEmployeeComponent} from './detail-employee/detail-employee.component';
import {ListEmployeeComponent} from './list-employee/list-employee.component';


const routes: Routes = [
  {
    path: 'employee/list', component: ListEmployeeComponent
  },
  {
    path: 'employee/detail/:id', component: DetailEmployeeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule {
}
