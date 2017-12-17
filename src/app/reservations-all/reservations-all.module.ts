import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReservationsAllComponent } from './reservations-all.component';
import {TranslateModule} from "@ngx-translate/core";
import {ReactiveFormsModule} from "@angular/forms";
import {IonicModule} from "ionic-angular";
import {ReservationsAllRoutingModule} from "./reservations-all-routing.module";
import {SharedModule} from "../shared/shared.module";
import {HopApiService} from "../home/hop-api.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    IonicModule,
    SharedModule,
    ReservationsAllRoutingModule
  ],
  declarations: [ReservationsAllComponent],
  providers: [HopApiService]
})
export class ReservationsAllModule { }
