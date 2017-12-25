import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddReservationRoutingModule } from './add-reservation-routing.module';
import { AddReservationComponent } from './add-reservation.component';
import {IonicModule} from 'ionic-angular';
import {TranslateModule} from '@ngx-translate/core';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    IonicModule,
    SharedModule,
    AddReservationRoutingModule
  ],
  exports: [
    AddReservationComponent
  ],
  entryComponents: [
    AddReservationComponent
  ],
  declarations: [AddReservationComponent]
})
export class AddReservationModule { }
