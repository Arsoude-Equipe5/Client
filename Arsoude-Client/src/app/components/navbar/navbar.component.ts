import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {

  language: string = "fr";
  
  constructor(public translator: TranslateService) {
    translator.setDefaultLang(this.language);
  }

  
}
