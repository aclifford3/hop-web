import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Route} from '../core/route.service';
import {extract} from '../core/i18n.service';
import {EditReservationComponent} from './edit-reservation.component';

const routes: Routes = Route.withShell([
  { path: 'edit-reservation', component: EditReservationComponent, data: { title: extract('Edit Reservation') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditReservationRoutingModule { }
