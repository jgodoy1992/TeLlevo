import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ApiDbService } from './api-db.service';

describe('ApiDbService', () => {
  let service: ApiDbService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiDbService],
    });
    service = TestBed.inject(ApiDbService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
