import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountRoutingModule } from './account-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {NotifierModule} from 'angular-notifier';


@NgModule({
  declarations: [CreateAccountComponent, EditAccountComponent, ChangePasswordComponent],
    imports: [
        CommonModule,
        AccountRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        NotifierModule
    ]
})
export class AccountModule { }
