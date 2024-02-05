import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ServerErrorMappings } from 'src/app/models/ServerErrorMappings';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {

language: string = "fr";
isWaiting:boolean=false;
requestResponse:string='';
requestResponseFormat:string=''



  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(private auth: AuthService, private router:Router, private toastr:ToastrService, public translator:TranslateService) {
    translator.setDefaultLang(this.language);
  }

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
          this.showSuccess();

        

        },
        error: (err) => {
          this.isWaiting =false

          console.log(err);
          this.requestResponse=err.error.error;
          this.requestResponseFormat = ServerErrorMappings.getLocalizationKey(this.requestResponse)
        },
      });
    }
  }

  showSuccess() {
    this.translator.get('signin.loginSuccess').subscribe((message: string) => {
      this.toastr.success(message);
    });
}
}
