import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-doom',
  templateUrl: './doom.component.html',
  styleUrls: ['./doom.component.css']
})
export class DoomComponent implements OnInit, AfterViewInit {
  iframeSrc: SafeResourceUrl;
  directLink: string; 

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {
    if (environment.production) {
      this.directLink = 'https://arsoude.ca/assets/doom/index.html';
    } else {
      this.directLink = 'http://localhost:4200/assets/doom/index.html';
    }
    this.iframeSrc = this.sanitizer.bypassSecurityTrustResourceUrl(this.directLink);
  }

  ngOnInit(): void {
    this.loadDoomScript();
  }

  ngAfterViewInit(): void {
    this.setupIframeFocus();
  }

  loadDoomScript(): void {
    const script = document.createElement('script');
    script.src = './assets/doom/websockets-doom.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }

  setupIframeFocus(): void {
    const iframeContainer = document.querySelector('.iframe-container');
    if (iframeContainer) {
      this.renderer.listen(iframeContainer, 'click', () => {
        const iframe: HTMLIFrameElement = document.getElementById('doomIframe') as HTMLIFrameElement;
        if (iframe) {
          iframe.focus();
        }
      });
    }
  }
}
