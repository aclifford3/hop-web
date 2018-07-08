import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../core/i18n.service';
import {ReservationHistoryComponent} from './reservation-history.component';
import {Route} from '../core/route.service';

const routes: Routes = Route.withShell([
  { path: 'history', component: ReservationHistoryComponent, data: { title: extract('History') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReservationHistoryRoutingModule { }
