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
      email: new FormControl('ghiles_94@hotmail.com', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('Ghiles123$', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(6),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z]).*$'),
      ]),
      confirmedPassword: new FormControl(
        'Ghiles123$',
        Validators.required
      ),
      firstName: new FormControl('Ghiles', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
      ]),
      lastName: new FormControl('Kouaou', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(40),
      ]),
      postalCode: new FormControl('j4j 1n2', [
        Validators.required,
        Validators.pattern(
          /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i

        ),
      ]),
      adresse: new FormControl('123 Bader St'),
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
      confirmedPassword,
      postalCode,
      firstName,
      lastName,
      dateOfBirth,
    } = this.formRegister.value;

    console.log(dateOfBirth);

    if (
      email &&
      password &&
      confirmedPassword &&
      postalCode &&
      firstName &&
      lastName
    ) {
      this.auth
        .register(
          email,
          password,
          confirmedPassword,
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
  const p2 = form.get('confirmedPassword');
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

    // Check if the input date is greater than today's date
    if (inputDate > currentDate) {
        return { futureDate: true }; // Return an object indicating a future date
    }

    return null; // Return null if validation passes
  };
}
