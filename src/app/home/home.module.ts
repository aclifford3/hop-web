import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from 'ionic-angular';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import {HopApiService} from "./hop-api.service";

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    IonicModule,
    HomeRoutingModule
  ],
  entryComponents: [
    HomeComponent
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    HopApiService
  ]
})
export class HomeModule { }
