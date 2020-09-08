import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarNumberPlateDetailsComponent } from './car-number-plate-details.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CarNumberPlateValidators } from 'src/common/car-number-plate-validators';

describe('CarNumberPlateDetailsComponent', () => {
  let component: CarNumberPlateDetailsComponent;
  let fixture: ComponentFixture<CarNumberPlateDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarNumberPlateDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarNumberPlateDetailsComponent);
    component = fixture.componentInstance;
    component.carPlateForm = new FormGroup({
      carNumber: new FormControl('', [
        Validators.required,
        // this.carNumberValidator
        CarNumberPlateValidators.validCarNumber
      ]),
      owner: new FormControl('', [
        Validators.required,
      ]),
    })
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
