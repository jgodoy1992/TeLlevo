import { TestBed } from '@angular/core/testing';

import { ApiDbService } from './api-db.service';

describe('ApiDbService', () => {
  let service: ApiDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
