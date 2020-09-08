import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarPlateComponent } from './edit-car-plate.component';
import { CarNumberPlateService } from '../car-number-plate.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { CarPlateNumber } from 'src/models/car-plate-number';
import { AbstractControl } from '@angular/forms';

class FakeActivatedRoute {
  snapshot = {
    paramMap: {
      get: (id) => {
        if (id === 'id') {
          return '5';
        }
      }
    }
  }
}

class FakeCarNumberPlateService {
  getCarNumberById(id: number): Observable<CarPlateNumber> {
    return of({
      carNumber: 'AAA111',
      owner: 'TEST',
      id: id,
    });
  }

  checkCarNumber(carNumber: string): Observable<boolean> {
    const takenCarNumbers = ['AAA111', 'BBB222'];
    return of(!takenCarNumbers.find(x => x === carNumber));
  }
}

describe('EditCarPlateComponent', () => {
  let component: EditCarPlateComponent;
  let fixture: ComponentFixture<EditCarPlateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditCarPlateComponent ],
      providers: [
        { provide: CarNumberPlateService, useValue: new FakeCarNumberPlateService() },
        { provide: ActivatedRoute, useValue: new FakeActivatedRoute() },
      ]
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

  it('unique validator initial value validation pass', (done) => {
    component.availability({value: 'AAA111'} as AbstractControl)
      .subscribe(ok => {
        expect(ok).toBeNull();
        done();
      });
  })

  it('unique validator taken value validation fail', (done) => {
    component.availability({value: 'BBB222'} as AbstractControl)
      .subscribe(ok => {
        expect(ok).not.toBeNull();
        done();
      });
  })

  it('unique validator some value validation pass', (done) => {
    component.availability({value: 'CCC333'} as AbstractControl)
      .subscribe(ok => {
        expect(ok).toBeNull();
        done();
      });
  })
});
