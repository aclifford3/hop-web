import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {Route} from '../core/route.service';
import {extract} from '../core/i18n.service';
import {AddReservationComponent} from './add-reservation.component';

const routes: Routes = Route.withShell([
  { path: 'reservation/add', component: AddReservationComponent, data: { title: extract('Add Reservation') } },
  { path: 'reservation/:propertyName/:checkInDate', component: AddReservationComponent, data: { title: extract('Edit Reservation') } }
]);
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AddReservationRoutingModule { }
