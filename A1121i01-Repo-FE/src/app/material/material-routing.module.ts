import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DetailMaterialComponent} from "./detail-material/detail-material.component";
import {ListMaterialComponent} from "./list-material/list-material.component";




const routes: Routes = [
  {

path:"detail/:id",component:DetailMaterialComponent, data: {title: 'Detail'}
  },
  {
    path:"list",component:ListMaterialComponent
  },{

    path: 'list',
    component: ListMaterialComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
