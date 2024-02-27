import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-doom',
  templateUrl: './doom.component.html',
  styleUrls: ['./doom.component.css']
})
export class DoomComponent {
  iframeSrc: SafeResourceUrl; // Use SafeResourceUrl type

  constructor(private sanitizer: DomSanitizer) {
    let url: string;
    if (environment.production) {
      url = 'https://arsoude.ca/doom/index.html';
    } else {
      url = 'http://localhost:8000/';
    }
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url); // Sanitize the URL
  }
}
