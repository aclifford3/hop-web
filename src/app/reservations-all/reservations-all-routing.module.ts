import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { extract } from '../core/i18n.service';
import {ReservationsAllComponent} from "./reservations-all.component";

const routes: Routes = [
  { path: 'reservations-all', component: ReservationsAllComponent, data: { title: extract('Reservations - All') } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ReservationsAllRoutingModule { }
