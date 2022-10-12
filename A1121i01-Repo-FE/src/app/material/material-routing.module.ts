import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
<<<<<<< HEAD
import {DetailMaterialComponent} from "./detail-material/detail-material.component";
import {ListMaterialComponent} from "./list-material/list-material.component";
=======
import {ListMaterialComponent} from './list-material/list-material.component';
>>>>>>> origin/material-manager


const routes: Routes = [
  {
<<<<<<< HEAD
path:"detail/:id",component:DetailMaterialComponent, data: {title: 'Detail'}
  },
  {
    path:"list",component:ListMaterialComponent
  }

=======
    path: 'list',
    component: ListMaterialComponent
  }
>>>>>>> origin/material-manager
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaterialRoutingModule { }
