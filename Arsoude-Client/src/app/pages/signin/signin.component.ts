import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private auth: AuthService) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;

    if (email && password) {
      this.auth.login(email, password).subscribe({
        next: (res) => {
          //handle response accordingly
          console.log(res);
        },
        error: (res) => {
          console.log(res);
        },
      });
    }
  }
}
