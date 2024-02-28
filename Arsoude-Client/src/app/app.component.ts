import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { KonamiService } from './services/konami.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Arsoude-Client';
  language: string = "fr";

  constructor(
    public translator: TranslateService,
    private konamiService: KonamiService
  ) {
    translator.setDefaultLang(this.language);
    console.log(environment);
  }

  ngOnInit(): void {
    this.konamiService.listenForKeyPresses();
  }

  changeLanguage(lang: string): void {
    this.language = lang;
    this.translator.use(this.language);
  }
}
