import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import {IonicModule} from 'ionic-angular';
import {CoreModule} from '../core/core.module';
import {TranslateModule} from '@ngx-translate/core';
import {ResetPasswordRoutingModule} from './reset-password-routing.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(ResetPasswordComponent),
        TranslateModule.forRoot(),
        ResetPasswordRoutingModule,
        RouterTestingModule,
        CoreModule
      ],
      declarations: [ ResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
