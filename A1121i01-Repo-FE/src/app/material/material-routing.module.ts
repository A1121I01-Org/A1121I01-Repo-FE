import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CreateMaterialComponent} from "./create-material/create-material.component";
import {EditMaterialComponent} from "./edit-material/edit-material.component";


const routes: Routes = [
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
