import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { CreateAccountComponent } from './create-account/create-account.component';
import { EditAccountComponent } from './edit-account/edit-account.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [CreateAccountComponent, EditAccountComponent, ChangePasswordComponent],
    imports: [
        CommonModule,
        AccountRoutingModule,
        ReactiveFormsModule
    ]
})
export class AccountModule { }
