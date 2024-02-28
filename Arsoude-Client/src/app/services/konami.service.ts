import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class KonamiService {
  private konamiCode: number[] = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
  private currentPosition: number = 0;

  constructor(private router: Router) {}

  listenForKeyPresses(): void {
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === this.konamiCode[this.currentPosition]) {
        this.currentPosition++;

        if (this.currentPosition === this.konamiCode.length) {
          this.router.navigate(['/doom']); // Adjust the route as necessary
          this.currentPosition = 0; // Reset the position
        }
      } else {
        this.currentPosition = 0; // Reset if the sequence is broken
      }
    });
  }
}
