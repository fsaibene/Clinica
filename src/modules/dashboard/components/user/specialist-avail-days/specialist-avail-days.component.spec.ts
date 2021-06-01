import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistAvailDaysComponent } from './specialist-avail-days.component';

describe('SpecialistAvailDaysComponent', () => {
  let component: SpecialistAvailDaysComponent;
  let fixture: ComponentFixture<SpecialistAvailDaysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistAvailDaysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistAvailDaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
