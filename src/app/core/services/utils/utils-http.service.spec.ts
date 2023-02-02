import { TestBed } from '@angular/core/testing';

import { UtilsHttpService } from './utils-http.service';

describe('UtilsHttpService', () => {
  let service: UtilsHttpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilsHttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
