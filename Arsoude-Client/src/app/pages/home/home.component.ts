import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent  {
  language: string = "fr";

  constructor(private auth: AuthService, public translator: TranslateService){
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
