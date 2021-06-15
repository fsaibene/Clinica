import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectSpecialistComponent } from './select-specialist.component';

describe('SelectSpecialistComponent', () => {
  let component: SelectSpecialistComponent;
  let fixture: ComponentFixture<SelectSpecialistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectSpecialistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectSpecialistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
