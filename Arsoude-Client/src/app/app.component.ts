import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(public http: HttpClient) {}

  title = 'Arsoude-Client';
  msgRecu: string = '';

  formRegister = new FormGroup({
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
        '/^[ABCEGHJKLMNPRSTVXY]d[ABCEGHJKLMNPRSTVWXYZ]( )?d[ABCEGHJKLMNPRSTVWXYZ]d$/i'
      ),
    ]),
  });

  onSubmit() {}
}
