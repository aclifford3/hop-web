import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../core/i18n.service';
import {ResetPasswordComponent} from "./reset-password.component";

const routes: Routes = [
  { path: 'reset-password', component: ResetPasswordComponent, data: { title: extract('Reset Password') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ResetPasswordRoutingModule { }
