import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-car-number-plate-details',
  templateUrl: './car-number-plate-details.component.html',
  styleUrls: ['./car-number-plate-details.component.css']
})
export class CarNumberPlateDetailsComponent implements OnInit {

  @Input() carPlateForm: FormGroup;
  @Output() formSubmitted = new EventEmitter<void>();

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.formSubmitted.emit();
  }

  cancel(): void {
    this.location.back();
  }
}
