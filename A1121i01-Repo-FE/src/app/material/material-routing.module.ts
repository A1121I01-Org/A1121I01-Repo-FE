import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {InforMaterialComponent} from './infor-material/infor-material.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';


const routes: Routes = [
  {
  path: 'infor', component: InforMaterialComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MaterialRoutingModule {}
