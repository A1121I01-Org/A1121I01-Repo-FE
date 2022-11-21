import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListCusComponent} from '../customer/list-cus/list-cus.component';
import {DetailBookComponent} from './detail-book/detail-book.component';
import {DescriptionDetailBookComponent} from './description-detail-book/description-detail-book.component';
import {BookModule} from './book.module';
import {CreateBookComponent} from './create-book/create-book.component';
import {ListBookByCategoryComponent} from '../list-book-by-category/list-book-by-category.component';


const routes: Routes = [
      {
        path: 'book/detail', component: DetailBookComponent
      },
      {
        path: 'book/des/:id', component: DescriptionDetailBookComponent
      },
      {
        path: 'admin/create', component: CreateBookComponent
      }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
