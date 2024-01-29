import { Component } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { MatDatepicker } from '@angular/material/datepicker';
import * as moment from 'moment';
import { Moment } from 'moment';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private auth: AuthService) {}

  title = 'Arsoude-Client';
  msgRecu: string = '';

  formRegister = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('Redeemed450514$', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(6),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z]).*$'),
      ]),
      passwordconfirm: new FormControl('Redeemed450514$', Validators.required),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
      ]),
      postalCode: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i
        ),
      ]),
      adresse: new FormControl(''),
      dateOfBirth: new FormControl('', [
        Validators.required,
        customDateValidator(),
      ]),
    },
    { validators: passwordValidator }
  );

  async onSubmit() {
    console.log(this.formRegister.value);

    const {
      email,
      password,
      passwordconfirm,
      postalCode,
      firstName,
      lastName,
      dateOfBirth,
    } = this.formRegister.value;

    console.log(dateOfBirth);

    if (
      email &&
      password &&
      passwordconfirm &&
      postalCode &&
      firstName &&
      lastName
    ) {
      this.auth
        .register(
          email,
          password,
          passwordconfirm,
          postalCode,
          firstName,
          lastName
        )
        .subscribe({
          next: (res) => {
            //TODO : handle response accordingly
            console.log(res);
          },
          error: (res) => {
            console.log(res);
          },
        });
    }
  }
}

const passwordValidator: ValidatorFn = (
  form: AbstractControl
): ValidationErrors | null => {
  const p1 = form.get('password');
  const p2 = form.get('passwordconfirm');
  return p1?.value !== p2?.value ? { passwordMismatch: true } : null;
};

export function customDateValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const currentDate = new Date();
    const inputDate = new Date(control.value);

    // Check if the input is a valid date
    if (isNaN(inputDate.getTime())) {
      return { invalidDate: true };
    }

    // Check if the input date is in the past
    const maxDate = new Date();
    maxDate.setFullYear(currentDate.getFullYear() - 150);
    if (inputDate < maxDate) {
      return { pastDate: true };
    }

    // Check if the input date is more than 2 years in the future
    const twoYearsLater = new Date();
    twoYearsLater.setFullYear(currentDate.getFullYear() + 2);
    if (inputDate > twoYearsLater) {
      return { futureDate: true };
    }

    return null; // Return null if validation passes
  };
}
