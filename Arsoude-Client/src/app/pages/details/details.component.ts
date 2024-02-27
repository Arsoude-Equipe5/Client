import { AfterViewInit, Component, Input, OnInit } from '@angular/core'; // Import Input decorator

import { Subscription } from 'rxjs';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikeDTO, hikeType } from 'src/app/models/HikeDTO';
import { HikePathDTO } from 'src/app/models/HikePathDTO';
import { HikeService } from 'src/app/services/HikeServices';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements AfterViewInit {
  @Input() center: google.maps.LatLngLiteral = { lat: 42, lng: -4 }; // Use @Input decorator
  @Input() zoom: number = 5; // Use @Input decorator
  markerPositions: google.maps.LatLngLiteral[];

  constructor(
    public hikeService: HikeService,
    private authService: AuthService
  ) {
    this.markerPositions = []; // Initialize as an empty array
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    // Get the full URL
    const url: string = window.location.href;

    // Split the URL by '/' to get individual parts
    const parts: string[] = url.split('/');

    // Assuming the ID is the last part of the URL
    const id: string = parts[parts.length - 1];

    this.hikeService.getSelectedHike(Number(id));
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  refreshPage() {
    window.location.reload();
  }

  async onButtonClick(id: number, hike: HikePathDTO): Promise<void> {
    await this.hikeService.addFavouriteHikes(id);
    await this.toggleFavourite(hike);
  }

  async toggleFavourite(hike: HikePathDTO): Promise<void> {
    // Display icon when the hike is not in favourite (empty star)
    const isNotInFavouriteIcon: String = 'far fa-regular fa-star';

    if (this.hikeService.isInFavourite(hike) === isNotInFavouriteIcon) {
      await this.hikeService.myFavouriteList.push(hike); // Add to favorites
    } else {
      // Remove from favorites
      this.hikeService.myFavouriteList = this.hikeService.myFavouriteList.filter(
        (favorite) => favorite.id !== hike.id
      );
    }
  }
}
