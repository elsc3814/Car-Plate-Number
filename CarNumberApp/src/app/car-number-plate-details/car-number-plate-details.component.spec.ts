import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CarNumberPlateDetailsComponent } from './car-number-plate-details.component';

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
