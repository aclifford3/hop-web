import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Route} from "../core/route.service";
import {extract} from "../core/i18n.service";
import {AddReservationComponent} from "./add-reservation.component";

const routes: Routes = Route.withShell([
  { path: 'add-reservation', component: AddReservationComponent, data: { title: extract('Add Reservation') } }
]);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AddReservationRoutingModule { }
