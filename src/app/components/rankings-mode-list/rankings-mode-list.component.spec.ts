import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingsModeListComponent } from './rankings-mode-list.component';

describe('RankingsModeListComponent', () => {
  let component: RankingsModeListComponent;
  let fixture: ComponentFixture<RankingsModeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RankingsModeListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingsModeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
