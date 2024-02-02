import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {

  language: string = "fr";
  
  constructor(public translator: TranslateService) {
    translator.setDefaultLang(this.language);
  }
  
  changeLanguage(lang: string, event: Event): void {
    event.preventDefault();  // Prevent the default behavior of the anchor element
    this.language = lang;
    this.translator.use(this.language);
  }
  
}
