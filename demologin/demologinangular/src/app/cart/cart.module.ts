import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import { ListCartComponent } from './list-cart/list-cart.component';
import { CreateCartComponent } from './create-cart/create-cart.component';
import { EditCartComponent } from './edit-cart/edit-cart.component';
import { DetailCartComponent } from './detail-cart/detail-cart.component';


@NgModule({
  declarations: [ListCartComponent, CreateCartComponent, EditCartComponent, DetailCartComponent],
  imports: [
    CommonModule,
    CartRoutingModule
  ]
})
export class CartModule { }
