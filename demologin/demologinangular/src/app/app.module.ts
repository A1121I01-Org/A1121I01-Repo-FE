import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './security/login/login.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {APP_BASE_HREF} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import {CustomerModule} from './customer/customer.module';
import {BookModule} from './book/book.module';
import {CartModule} from './cart/cart.module';
import {AccountModule} from './account/account.module';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import {SecurityModule} from './security/security.module';
import {NgxPaginationModule} from 'ngx-pagination';


@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        HeaderComponent,
        FooterComponent,
        SidebarComponent,
        HeaderComponent,
        HomeComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        RouterModule,
        CustomerModule,
        BookModule,
        CartModule,
        AccountModule,
        SecurityModule,
        NgxPaginationModule

    ],
    providers: [authInterceptorProviders,
        JwtHelperService,
        {provide: JWT_OPTIONS, useValue: JWT_OPTIONS},
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    exports: [
        HeaderComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
