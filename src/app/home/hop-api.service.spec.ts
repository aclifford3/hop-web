import { TestBed, inject } from '@angular/core/testing';

import { HopApiService } from './hop-api.service';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from '../core/authentication/authentication.service';
import {MockAuthenticationService} from '../core/authentication/authentication.service.mock';

describe('HopApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [HopApiService,
        {provide: AuthenticationService, useClass: MockAuthenticationService}]
    });
  });

  it('should be created', inject([HopApiService], (service: HopApiService) => {
    expect(service).toBeTruthy();
  }));
});
