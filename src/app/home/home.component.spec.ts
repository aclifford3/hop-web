import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Http, BaseRequestOptions } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {IonicModule, NavController} from 'ionic-angular';

import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { QuoteService } from './quote.service';
import {PropertyNamePipe} from './property-name.pipe';
import {HopApiService} from './hop-api.service';
import {CommonModule} from '@angular/common';
import {AppModule} from '../app.module';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {CoreModule} from '../core/core.module';
import {AppComponent} from '../app.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
          IonicModule.forRoot(HomeComponent),
          SharedModule,
          CommonModule,
          HttpClientModule,
        ],
        declarations: [
          HomeComponent,
          PropertyNamePipe
        ],
        providers: [
          QuoteService,
          HopApiService,
          AuthenticationService,
          MockBackend,
          BaseRequestOptions,
          {
            provide: Http,
            useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
              return new Http(backend, defaultOptions);
            },
            deps: [MockBackend, BaseRequestOptions]
          }
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
