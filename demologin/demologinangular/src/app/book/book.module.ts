import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BookRoutingModule } from './book-routing.module';
import { ListBookComponent } from './list-book/list-book.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { DetailBookComponent } from './detail-book/detail-book.component';
import { DescriptionDetailBookComponent } from './description-detail-book/description-detail-book.component';
import {AppModule} from '../app.module';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [ListBookComponent, CreateBookComponent, EditBookComponent, DetailBookComponent, DescriptionDetailBookComponent],
    imports: [
        CommonModule,
        BookRoutingModule,
        FormsModule
    ]
})
export class BookModule { }
