import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListMaterialComponent} from './list-material/list-material.component';


const routes: Routes = [
  {
    path: 'list',
    component: ListMaterialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
