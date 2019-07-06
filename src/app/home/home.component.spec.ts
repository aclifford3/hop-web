// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import {IonicModule, LoadingController, NavController} from 'ionic-angular';
//
// import { SharedModule } from '../shared/shared.module';
// import { HomeComponent } from './home.component';
// import {PropertyNamePipe} from './property-name.pipe';
// import {HopApiService} from './hop-api.service';
// import {CommonModule} from '@angular/common';
// import {HttpClientModule} from '@angular/common/http';
// import {MockAuthenticationService} from '../core/authentication/authentication.service.mock';
// import {AuthenticationService} from '../core/authentication/authentication.service';
// import {LoadingControllerMock} from '../shared/mock/loading-controller.d.mock';
// import {RouterTestingModule} from '@angular/router/testing';
//
// describe('HomeComponent', () => {
//   let component: HomeComponent;
//   let fixture: ComponentFixture<HomeComponent>;
//
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         IonicModule.forRoot(HomeComponent),
//         SharedModule,
//         CommonModule,
//         HttpClientModule,
//         RouterTestingModule
//       ],
//       declarations: [HomeComponent, PropertyNamePipe],
//       providers: [
//         {provide: AuthenticationService, useClass: MockAuthenticationService},
//         NavController,
//         {provide: LoadingController, useClass: LoadingControllerMock},
//         HopApiService,
//       ]
//     })
//       .compileComponents().then(value => {
//       console.log('Output was: ', value);
//     })
//       .catch(err => {
//         console.log('Error during compilation', err);
//       });
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(HomeComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });
//
//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
//   it('should show loading spinner before data is loaded', () => {
//     expect(component.isLoading).toBeTruthy();
//   });
//
//
// });
