import { Component, Input, OnInit } from '@angular/core';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikeDTO, HikeStatus, hikeType } from 'src/app/models/HikeDTO';
import { HikeService } from 'src/app/services/HikeServices';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css'],
})
export class TileComponent implements OnInit {
  startPoint1 = new HikeCoordinatesDTO(37.7749, -122.4194, new Date());
  endPoint1 = new HikeCoordinatesDTO(40.7128, -74.006, new Date());

  constructor(
    public hikeService: HikeService,
    private authService: AuthService
  ) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  async onButtonClick(id: number, hike: HikeDTO): Promise<void> {
    await this.hikeService.addFavouriteHikes(id);
    await this.toggleFavourite(hike);
  }

  async toggleFavourite(hike: HikeDTO): Promise<void> {
    //Display icon when the hike is not in favourite (empty star)
    const isNotInFavouriteIcon: String = 'far fa-regular fa-star';

    if (this.hikeService.isInFavourite(hike) === isNotInFavouriteIcon) {
      await this.hikeService.myFavouriteList.push(hike); // Add to favorites
    } else {
      // Remove from favorites
      this.hikeService.myFavouriteList =
        this.hikeService.myFavouriteList.filter(
          (favorite) => favorite.id !== hike.id
        );
    }
  }

  @Input() hike: HikeDTO = new HikeDTO(
    1,
    'Hike 1',
    'Location 1',
    'Description 1',
    'Image URL 1',
    hikeType.bike,
    10.2,
    '1.2',
    this.startPoint1,
    this.endPoint1,
    HikeStatus.Validated
  );

  @Input() center: google.maps.LatLngLiteral = { lat: 42, lng: -4 };
  @Input() zoom: number = 5;

  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: this.hike.startPoint.latitude, lng: this.hike.startPoint.longitude },
    { lat: this.hike.endPoint.latitude, lng: this.hike.endPoint.longitude },
  ];

  ngOnInit() {}
}
