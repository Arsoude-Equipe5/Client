import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent  {
  language: string = "fr";

  constructor(private auth: AuthService, private router: Router,private toastr: ToastrService, public translator:TranslateService) {
    translator.setDefaultLang(this.language);
  }

  title = 'Arsoude-Client';
  msgRecu: string = '';
  requestResponse:string='';
  isWaiting:boolean=false;
  

  date = new Date().toISOString().slice(0,10);

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
        Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*()_+{}|:"<>?])(?=.*[a-zA-Z]).*$'),
      ]),
      confirmedPassword: new FormControl(
        '',
        Validators.required
      ),
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
    this.isWaiting =true
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
            //handle response accordingly
            console.log(res);
            this.router.navigate(['/signin'])
            // window.alert('Account created successfully!')
            this.toastr.success('Account created successfully!')
            this.isWaiting =false;

          },
          error: (err) => {
            this.isWaiting =false;

            this.requestResponse = err.error.error
            console.log(err);
            console.log(this.requestResponse);
            
          }
          
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
