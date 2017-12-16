import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResetPasswordComponent } from './reset-password.component';
import {ResetPasswordRoutingModule} from "./reset-password-routing.module";
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "ionic-angular";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    ResetPasswordRoutingModule
  ],
  entryComponents: [ResetPasswordComponent],
  declarations: [ResetPasswordComponent]
})
export class ResetPasswordModule { }
