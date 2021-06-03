import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistAvailRangeComponent } from './specialist-avail-range.component';

describe('SpecialistAvailRangeComponent', () => {
  let component: SpecialistAvailRangeComponent;
  let fixture: ComponentFixture<SpecialistAvailRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistAvailRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistAvailRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
