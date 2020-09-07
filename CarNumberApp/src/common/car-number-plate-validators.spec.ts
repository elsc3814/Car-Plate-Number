import { CarNumberPlateValidators } from './car-number-plate-validators';
import { AbstractControl } from '@angular/forms';

describe('CarNumberPlateValidators', () => {

  it('ABC123 should be valid car plate number', () => {
    expect(CarNumberPlateValidators.validCarNumber({value: 'ABC123'} as AbstractControl)).toBeNull();
  });

  it('123ABC should be valid car plate number', () => {
    expect(CarNumberPlateValidators.validCarNumber({value: '123ABC'} as AbstractControl)).not.toBeNull();
  });
});
