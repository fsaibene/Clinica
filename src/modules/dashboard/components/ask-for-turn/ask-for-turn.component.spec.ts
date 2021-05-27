import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AskForTurnComponent } from './ask-for-turn.component';

describe('AskForTurnComponent', () => {
  let component: AskForTurnComponent;
  let fixture: ComponentFixture<AskForTurnComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AskForTurnComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AskForTurnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
