import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-doom',
  templateUrl: './doom.component.html',
  styleUrls: ['./doom.component.css']
})
export class DoomComponent {
  iframeSrc: SafeResourceUrl;
  directLink: string; 

  constructor(private sanitizer: DomSanitizer) {
    if (environment.production) {
      this.directLink = 'https://arsoude.ca/assets/doom/index.html';
    } else {
      this.directLink = 'http://localhost:4200/assets/doom/index.html';
    }
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.directLink);
  }
}