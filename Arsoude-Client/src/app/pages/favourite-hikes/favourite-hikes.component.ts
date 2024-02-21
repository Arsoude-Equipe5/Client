import { Component } from '@angular/core';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikeDTO, HikeStatus, hikeType } from 'src/app/models/HikeDTO';
import { HikeService } from 'src/app/services/HikeServices';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@Component({
  selector: 'app-favourite-hikes',
  templateUrl: './favourite-hikes.component.html',
  styleUrls: ['./favourite-hikes.component.css'],
})
export class FavouriteHikeComponent {
  center: google.maps.LatLngLiteral = { lat: 42, lng: -4 };
  zoom = 5;
  hikesList: HikeDTO[] = [];

  constructor(public hikeService: HikeService) {
    this.hikeService.getFavouriteHikes();

    const startPoint1 = new HikeCoordinatesDTO(37.7749, -122.4194, new Date());
    const endPoint1 = new HikeCoordinatesDTO(40.7128, -74.006, new Date());

    const startPoint2 = new HikeCoordinatesDTO(34.0522, -118.2437, new Date());
    const endPoint2 = new HikeCoordinatesDTO(41.8781, -87.6298, new Date());

    // Create instances of HikeDTO using the coordinates
    const hike1 = new HikeDTO(
      1,
      'Hike 1',
      'Location 1',
      'Description 1',
      'Image URL 1',
      hikeType.bike,
      10.2,
      '1.2',
      startPoint1,
      endPoint1,
      HikeStatus.Validated
    );

    const hike2 = new HikeDTO(
      2,
      'Hike 2',
      'Location 2',
      'Description 2',
      'Image URL 2',
      hikeType.walk,
      10.2,
      '1.2',
      startPoint2,
      endPoint2,
      HikeStatus.Validated
    );

    // Create a list of HikeDTO instances
    //const hikesList: HikeDTO[] = [hike1, hike2];
    this.hikesList = [hike1, hike2];
  }
}
