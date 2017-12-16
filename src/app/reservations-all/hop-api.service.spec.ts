import { TestBed, inject } from '@angular/core/testing';

import { HopApiService } from './hop-api.service';

describe('HopApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HopApiService]
    });
  });

  it('should be created', inject([HopApiService], (service: HopApiService) => {
    expect(service).toBeTruthy();
  }));
});
