import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent {

  language: string = "fr";
  
  constructor(public translator: TranslateService) {
    translator.setDefaultLang(this.language);
  }

}
