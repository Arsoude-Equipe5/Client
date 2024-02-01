// translation.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang('fr'); // Default language is English
  }

  setLanguage(lang: string): void {
    this.translate.use(lang);
  }
}
