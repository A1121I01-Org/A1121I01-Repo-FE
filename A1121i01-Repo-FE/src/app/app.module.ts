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
import { ErrorComponent } from './error/error.component';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {APP_BASE_HREF} from '@angular/common';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        CustomerModule,
        EmployeeModule,
        CartModule,
        AccountModule,
        SecurityModule,
        HttpClientModule,
        MaterialModule,
        RouterModule
    ],
    providers: [
        authInterceptorProviders,
        JwtHelperService,
        {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
        { provide: APP_BASE_HREF, useValue: '/'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
