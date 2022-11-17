import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ListCusComponent} from '../customer/list-cus/list-cus.component';
import {DetailBookComponent} from './detail-book/detail-book.component';
import {DescriptionDetailBookComponent} from './description-detail-book/description-detail-book.component';
import {BookModule} from './book.module';


const routes: Routes = [
      {
        path: 'book/detail', component: DetailBookComponent
      },
      {
        path: 'book/des/:id', component: DescriptionDetailBookComponent
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookRoutingModule { }
