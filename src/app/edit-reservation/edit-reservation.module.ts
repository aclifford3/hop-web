import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditReservationRoutingModule } from './edit-reservation-routing.module';
import { EditReservationComponent } from './edit-reservation.component';

@NgModule({
  imports: [
    CommonModule,
    EditReservationRoutingModule
  ],
  entryComponents: [EditReservationComponent],
  declarations: [EditReservationComponent]
})
export class EditReservationModule { }
