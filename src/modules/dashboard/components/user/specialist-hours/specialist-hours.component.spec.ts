import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistHoursComponent } from './specialist-hours.component';

describe('SpecialistHoursComponent', () => {
  let component: SpecialistHoursComponent;
  let fixture: ComponentFixture<SpecialistHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
