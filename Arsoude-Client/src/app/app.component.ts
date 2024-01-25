import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, Validators } from '@angular/forms';


import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

 
  async ngOnInit(): Promise<void> {
    // throw new Error('Method not implemented.');

//     let response = await lastValueFrom(this.http.get<any>('http://localhost:5020/api/HelloWorld/HelloWorld'));
// console.log(response.text);
// this.msgRecu = response.text;

  }

  constructor(public http:HttpClient){}

  title = 'Arsoude-Client';
  msgRecu :string= '';
  // email :string ='';
  // password :string ='';
  // password2 :string ='';
  

  formRegister = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")] ),
    password: new FormControl('',[Validators.required,Validators.maxLength(100), Validators.minLength(6),Validators.pattern("^(?=.*[0-9])(?=.*[a-zA-Z]).*$")]),
    password2:new FormControl('', Validators.required),

    firstName:new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]),
    lastName:new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]), 
    postalCode: new FormControl('',[Validators.required,Validators.pattern('/^[ABCEGHJKLMNPRSTVXY]\d[ABCEGHJKLMNPRSTVWXYZ]( )?\d[ABCEGHJKLMNPRSTVWXYZ]\d$/i')])
  });

  onSubmit() {

   this.formRegister.markAsTouched();
   if (this.formRegister.get('email')?.hasError('required')) {
    console.log('you have not entered any special characters');
  }
  
  


  }

}
