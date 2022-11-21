import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { ListBookComponent } from './list-book/list-book.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { DetailBookComponent } from './detail-book/detail-book.component';
import { DescriptionDetailBookComponent } from './description-detail-book/description-detail-book.component';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { ListBookByCategoryComponent } from '../list-book-by-category/list-book-by-category.component';
import {NgxPaginationModule} from 'ngx-pagination';



@NgModule({
  declarations: [ListBookComponent, CreateBookComponent, EditBookComponent, DetailBookComponent, DescriptionDetailBookComponent, ListBookByCategoryComponent],
    imports: [
        CommonModule,
        BookRoutingModule,
        FormsModule,
        RouterModule,
        HttpClientModule,
        NgxPaginationModule
    ]
})
export class BookModule { }
