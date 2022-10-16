import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateMaterialComponent} from "./create-material/create-material.component";
import {EditMaterialComponent} from "./edit-material/edit-material.component";

import {DetailMaterialComponent} from "./detail-material/detail-material.component";
import {ListMaterialComponent} from "./list-material/list-material.component";




const routes: Routes = [
  {

path:"detail/:id",component:DetailMaterialComponent, data: {title: 'Detail'}
  },
  {
    path:"list",component:ListMaterialComponent
  },

  {
    path: 'material/create', component: CreateMaterialComponent,

  },
  {
    path: 'material/edit/:id', component: EditMaterialComponent,

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
