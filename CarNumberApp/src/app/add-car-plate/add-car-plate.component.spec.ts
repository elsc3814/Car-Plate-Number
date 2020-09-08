import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCarPlateComponent } from './add-car-plate.component';
import { CarNumberPlateService } from '../car-number-plate.service';

describe('AddCarPlateComponentComponent', () => {
  let component: AddCarPlateComponent;
  let fixture: ComponentFixture<AddCarPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCarPlateComponent ],
      providers: [
        { provide: CarNumberPlateService, useValue: {} }
      ]
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
