import { TestBed } from '@angular/core/testing';

import { CurrentGameStoreService } from './current-game-store.service';

describe('CurrentGameStoreService', () => {
  let service: CurrentGameStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentGameStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
