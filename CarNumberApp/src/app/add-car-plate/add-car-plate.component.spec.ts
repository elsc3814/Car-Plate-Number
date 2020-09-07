import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarPlateComponent } from './add-car-plate.component';

describe('AddCarPlateComponentComponent', () => {
  let component: AddCarPlateComponent;
  let fixture: ComponentFixture<AddCarPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarPlateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCarPlateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
