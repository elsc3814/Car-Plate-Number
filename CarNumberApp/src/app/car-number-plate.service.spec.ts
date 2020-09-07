import { TestBed } from '@angular/core/testing';

import { CarNumberPlateService } from './car-number-plate.service';
import { HttpClientModule } from '@angular/common/http';

describe('CarNumberPlateService', () => {
  let service: CarNumberPlateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ]
    });
    service = TestBed.inject(CarNumberPlateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
