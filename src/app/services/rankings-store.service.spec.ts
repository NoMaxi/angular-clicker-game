import { TestBed } from '@angular/core/testing';

import { RankingsStoreService } from './rankings-store.service';

describe('RankignsStoreService', () => {
  let service: RankingsStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RankingsStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
