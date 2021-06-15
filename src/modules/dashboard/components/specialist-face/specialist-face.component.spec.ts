import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialistFaceComponent } from './specialist-face.component';

describe('SpecialistFaceComponent', () => {
  let component: SpecialistFaceComponent;
  let fixture: ComponentFixture<SpecialistFaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpecialistFaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpecialistFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
