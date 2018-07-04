import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../../core/i18n.service';
import {ReservationHistoryComponent} from './reservation-history.component';

const routes: Routes = [
  { path: 'history', component: ReservationHistoryComponent, data: { title: extract('History') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReservationHistoryRoutingModule { }
