import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarPlateComponent } from './edit-car-plate.component';

describe('EditCarPlateComponent', () => {
  let component: EditCarPlateComponent;
  let fixture: ComponentFixture<EditCarPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCarPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
