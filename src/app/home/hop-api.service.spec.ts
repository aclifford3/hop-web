import { TestBed, inject } from '@angular/core/testing';

import { HopApiService } from './hop-api.service';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '../core/core.module';

describe('HopApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        CoreModule
      ],
      providers: [HopApiService]
    });
  });

  it('should be created', inject([HopApiService], (service: HopApiService) => {
    expect(service).toBeTruthy();
  }));
});
