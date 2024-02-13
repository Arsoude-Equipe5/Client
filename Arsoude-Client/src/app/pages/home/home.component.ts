import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { HikeService } from 'src/app/services/HikeServices';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  language: string = "fr";

  inputKeyword = new FormControl('');

  constructor(private auth: AuthService, public translator: TranslateService, private hikeService:HikeService){
    translator.setDefaultLang(this.language);
  }
  // ngOnInit(): void {

  //   // this.auth.getHikes().subscribe({

  //   // next:(res)=>{

  //   //   console.log(res);
      

  //   // },
  //   // error:(err)=>{console.log(err);
  //   // }
  //   // })

  // }

  changeLanguage(lang:string):void{
    this.language = lang;
    this.translator.use(this.language);
  }




}
