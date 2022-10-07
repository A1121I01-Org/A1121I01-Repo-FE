import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CustomerModule} from './customer/customer.module';
import {EmployeeModule} from './employee/employee.module';
import {CartModule} from './cart/cart.module';
import {AccountModule} from './account/account.module';
import {SecurityModule} from './security/security.module';
import {MaterialModule} from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ErrorComponent } from './error/error.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CustomerModule,
    EmployeeModule,
    CartModule,
    AccountModule,
    SecurityModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
