import { AuthService } from './services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private auth: AuthService) {}

  title = 'Arsoude-Client';
  msgRecu: string = '';

  formRegister = new FormGroup(
    {
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.maxLength(100),
        Validators.minLength(6),
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z]).*$'),
      ]),
      password2: new FormControl('', Validators.required),

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
          '/^[ABCEGHJ-NPRSTVXY]d[ABCEGHJ-NPRSTV-Z][ -]?d[ABCEGHJ-NPRSTV-Z]d$/i'
        ),
      ]),
    },
    { validators: passwordValidator }
  );

  async onSubmit() {
    console.log(this.formRegister.value);

    const { email, password, postalCode, firstName, lastName } =
      this.formRegister.value;

    if (email && password && postalCode && firstName && lastName) {
      this.auth
        .register(email, password, postalCode, firstName, lastName)
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
  const p2 = form.get('password2');
  return p1?.value !== p2?.value ? { passwordMismatch: true } : null;
};
