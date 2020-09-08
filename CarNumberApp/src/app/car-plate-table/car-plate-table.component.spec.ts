import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { CarPlateTableComponent } from './car-plate-table.component';
import { CarNumberPlateService } from '../car-number-plate.service';
import { Observable, of } from 'rxjs';
import { CarPlateNumber } from 'src/models/car-plate-number';

class FakeCarNumberPlateService {
  getAllCarNumbers(id: number): Observable<CarPlateNumber[]> {
    return of([{
      carNumber: 'AAA111',
      owner: 'TEST',
      id: 5
    }]);
  }
}

describe('CarPlateTableComponent', () => {
  let component: CarPlateTableComponent;
  let fixture: ComponentFixture<CarPlateTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CarPlateTableComponent ],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ],
      providers: [
        { provide: CarNumberPlateService, useValue: new FakeCarNumberPlateService() }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CarPlateTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
