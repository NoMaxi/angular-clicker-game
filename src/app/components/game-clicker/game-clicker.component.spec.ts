import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameClickerComponent } from './game-clicker.component';

describe('GameClickerComponent', () => {
  let component: GameClickerComponent;
  let fixture: ComponentFixture<GameClickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameClickerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameClickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
