// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
//
// import { AddReservationComponent } from './add-reservation.component';
// import {IonicModule, LoadingController, NavController, NavParams} from 'ionic-angular';
// import {HopApiService} from '../home/hop-api.service';
// import {HttpClientModule} from '@angular/common/http';
// import {LoadingControllerMock} from '../shared/mock/loading-controller.d.mock';
// import {AuthenticationService} from '../core/authentication/authentication.service';
// import {MockAuthenticationService} from '../core/authentication/authentication.service.mock';
// import {NavParamsMock} from '../shared/mock/nav-params.d.mock';
// import {RouterTestingModule} from '@angular/router/testing';
//
// describe('AddReservationComponent', () => {
//   let component: AddReservationComponent;
//   let fixture: ComponentFixture<AddReservationComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         IonicModule.forRoot(AddReservationComponent),
//         HttpClientModule,
//         RouterTestingModule
//       ],
//       declarations: [ AddReservationComponent ],
//       providers: [
//         {provide: AuthenticationService, useClass: MockAuthenticationService},
//         NavController,
//         {provide: LoadingController, useClass: LoadingControllerMock},
//         HopApiService,
//         {provide: NavParams, useClass: NavParamsMock}
//         ]
//     })
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(AddReservationComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
