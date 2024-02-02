import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Arsoude-Client';



  language: string = "fr";

  constructor(public translator: TranslateService) {
    translator.setDefaultLang(this.language);
    console.log(environment);
  }

  changeLanguage(lang:string):void{
    this.language = lang;
    this.translator.use(this.language);
  }
}
