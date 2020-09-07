import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CarNumberPlateValidators {
    static validCarNumber(control: AbstractControl): ValidationErrors | null {
        const regex = new RegExp('^[A-Z]{3}[0-9]{3}$');
        return regex.test(control.value) ? null : { carNumber: 'Bad car number' };
    }
}
