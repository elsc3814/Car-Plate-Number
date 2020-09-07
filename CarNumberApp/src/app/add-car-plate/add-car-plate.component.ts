import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Location } from '@angular/common';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { CarNumberPlateService } from '../car-number-plate.service';
import { CarNumberPlateValidators } from 'src/common/car-number-plate-validators';

@Component({
  selector: 'app-add-car-plate',
  templateUrl: './add-car-plate.component.html',
  styleUrls: ['./add-car-plate.component.css']
})
export class AddCarPlateComponent implements OnInit {

  constructor(private service: CarNumberPlateService, private location: Location) { }

  carPlateForm = new FormGroup({
    carNumber: new FormControl('', [
      Validators.required,
      // this.carNumberValidator
      CarNumberPlateValidators.validCarNumber
    ], [
      this.availability.bind(this)
    ]),
    owner: new FormControl('', [
      Validators.required,
    ]),
  });

  ngOnInit(): void {
  }

  addCarNumber(): void {
    if (this.carPlateForm.valid) {
      this.service.addCarNumber(this.carPlateForm.value).subscribe(
        ok => {
          this.location.back();
        },
        err => {
          alert('Create failed.');
        }
      );
    }
  }

  private availability(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.service.checkCarNumber(control.value)
      .pipe(
        map(x => x ? null : { unique: 'Car number is not unique' })
      );
  }
}
