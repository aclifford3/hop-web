// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { ReservationHistoryComponent } from './reservation-history.component';
// import {IonicModule, IonicPageModule, LoadingController, NavController} from 'ionic-angular';
// import {HomeModule} from '../home/home.module';
// import {HttpClientModule} from '@angular/common/http';
// import {SharedModule} from '../shared/shared.module';
// import {CommonModule} from '@angular/common';
// import {TranslateModule, TranslateService} from '@ngx-translate/core';
// import {TranslateServiceMock} from '../shared/mock/translate-service.d.mock';
// import {NavControllerMock} from '../shared/mock/nav-controller.d.mock';
// import {CoreModule} from '../core/core.module';
// import {HomeComponent} from '../home/home.component';
// import {AppComponent} from '../app.component';
// import {LoadingControllerMock} from '../shared/mock/loading-controller.d.mock';
// import {AuthenticationGuard} from '../core/authentication/authentication.guard';
// import {MockAuthenticationService} from '../core/authentication/authentication.service.mock';
// import {HopApiService} from '../home/hop-api.service';
// import {HopApiServiceMock} from '../home/hop-api.service.mock';
// import {AuthenticationService} from '../core/authentication/authentication.service';
//
// describe('ReservationHistoryComponent', () => {
//   let component: ReservationHistoryComponent;
//   let fixture: ComponentFixture<ReservationHistoryComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         IonicModule.forRoot(ReservationHistoryComponent),
//         SharedModule,
//         CommonModule,
//         HttpClientModule,
//         TranslateModule.forRoot(),
//         CoreModule,
//         HomeModule
//       ],
//       declarations: [ ReservationHistoryComponent ],
//       providers: [
//         {provide: NavController, useClass: NavControllerMock},
//         {provide: LoadingController, useClass: LoadingControllerMock},
//         {provide: HopApiService, useClass: HopApiServiceMock},
//         {provide: AuthenticationService, useClass: MockAuthenticationService}
//       ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(ReservationHistoryComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
