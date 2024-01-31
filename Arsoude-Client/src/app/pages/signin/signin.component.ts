import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {


isWaiting:boolean=false;
requestResponse:string='';



  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private auth: AuthService, private router:Router, private toastr:ToastrService) {}

  onSubmit() {
    const { email, password } = this.loginForm.value;

        this.isWaiting =true
  
    if (email && password) {
      this.auth.login(email, password).subscribe({
        next: (res) => {
          this.isWaiting =false
          
          console.log(res.token);
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home'])
          // window.alert('Account created successfully!')
          this.toastr.success('Logged in successfully!')

        

        },
        error: (err) => {
          this.isWaiting =false

          console.log(err);
          this.requestResponse=err.error.error;
        },
      });
    }
  }
}
