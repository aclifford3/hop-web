import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationHistoryComponent } from './reservation-history.component';
import {ReservationHistoryRoutingModule} from './reservation-history-routing.module';
import {TranslateModule} from '@ngx-translate/core';
import {CoreModule} from '../core/core.module';
import {HomeModule} from '../home/home.module';
import {IonicModule} from 'ionic-angular';

@NgModule({
  imports: [
    CommonModule,
    ReservationHistoryRoutingModule,
    TranslateModule,
    CoreModule,
    IonicModule,
    HomeModule
  ],
  entryComponents: [
    ReservationHistoryComponent
  ],
  declarations: [ReservationHistoryComponent]
})
export class ReservationHistoryModule { }
