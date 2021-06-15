import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAppointmentTimeComponent } from './select-appointment-time.component';

describe('SelectAppointmentTimeComponent', () => {
  let component: SelectAppointmentTimeComponent;
  let fixture: ComponentFixture<SelectAppointmentTimeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAppointmentTimeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAppointmentTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
