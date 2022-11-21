import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';

import { EditBookAdminComponent } from './edit-book-admin/edit-book-admin.component';
import {AddBookComponent} from './add-book/add-book.component';


@NgModule({
  declarations: [ EditBookAdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
