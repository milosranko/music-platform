import { TestBed } from '@angular/core/testing';

import { SaasApiService } from './saas-api.service';

describe('SaasApiService', () => {
  let service: SaasApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SaasApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
