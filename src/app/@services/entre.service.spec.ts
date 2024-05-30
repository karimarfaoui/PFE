import { TestBed } from '@angular/core/testing';

import { EntreService } from './entre.service';

describe('EntreService', () => {
  let service: EntreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
