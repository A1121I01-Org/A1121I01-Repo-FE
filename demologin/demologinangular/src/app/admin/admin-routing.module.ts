import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddBookComponent} from './add-book/add-book.component';
import {EditBookAdminComponent} from './edit-book-admin/edit-book-admin.component';


const routes: Routes = [
  {
    path: 'add-book', component: AddBookComponent
  },
  {
    path: 'eit-book-admin', component: EditBookAdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
