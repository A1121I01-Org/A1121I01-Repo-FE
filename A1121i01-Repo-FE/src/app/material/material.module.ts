import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialRoutingModule } from './material-routing.module';
import { CreateMaterialComponent } from './create-material/create-material.component';
import { EditMaterialComponent } from './edit-material/edit-material.component';
import { DetailMaterialComponent } from './detail-material/detail-material.component';
import { ListMaterialComponent } from './list-material/list-material.component';
import { InforMaterialComponent } from './infor-material/infor-material.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [CreateMaterialComponent, EditMaterialComponent, DetailMaterialComponent, ListMaterialComponent, InforMaterialComponent],
  exports: [
    InforMaterialComponent,
    DetailMaterialComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MaterialRoutingModule, HttpClientModule,
    RouterModule, FormsModule, ReactiveFormsModule,
  ]})

export class MaterialModule { }
