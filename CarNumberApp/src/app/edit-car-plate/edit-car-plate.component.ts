import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CarNumberPlateService } from '../car-number-plate.service';
import { CarNumberPlateValidators } from '../../common/car-number-plate-validators';

@Component({
  selector: 'app-edit-car-plate',
  templateUrl: './edit-car-plate.component.html',
  styleUrls: ['./edit-car-plate.component.css']
})
export class EditCarPlateComponent implements OnInit {

  private id: number;
  private initialCarNumber: string;

  carPlateForm = new FormGroup({
    carNumber: new FormControl('', [
      Validators.required,
      CarNumberPlateValidators.validCarNumber
    ], [
      this.availability.bind(this)
    ]),
    owner: new FormControl('', [
      Validators.required,
    ]),
  });

  constructor(
    private service: CarNumberPlateService,
    private location: Location,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');

    this.service.getCarNumberById(this.id).subscribe(
      ok => {
        this.initialCarNumber = ok.carNumber;

        this.carPlateForm.setValue({
          carNumber: ok.carNumber,
          owner: ok.owner
        });
      },
      err => { }
    );
  }

  updateCarNumber(): void {
    if (this.carPlateForm.valid) {
      this.service.editCarNumber(this.id, this.carPlateForm.value).subscribe(
        ok => {
          this.location.back();
        },
        err => {
          alert('Update failed.');
        }
      );
    }
  }

  availability(control: AbstractControl): Observable<ValidationErrors | null> {
    if (this.initialCarNumber === control.value) {
      return of(null);
    }

    return this.service.checkCarNumber(control.value).pipe(
      map(x => x ? null : { unique: 'Car number is not unique' })
    );
  }
}
