import { Component, OnInit } from '@angular/core';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikeDTO, hikeType } from 'src/app/models/HikeDTO';
import { HikeService } from 'src/app/services/HikeServices';

@Component({
  selector: 'app-favourite-hikes',
  templateUrl: './favourite-hikes.component.html',
  styleUrls: ['./favourite-hikes.component.css']
})
export class FavouriteHikeComponent implements OnInit {
  center: google.maps.LatLngLiteral = { lat: 42, lng: -4 };
  zoom = 5;
  hikesList: HikeDTO[] = [];

  constructor(public hikeService: HikeService) {}

  ngOnInit(): void {
    this.hikeService.getFavouriteHikes()
  }

  initializeHikes(hikes: HikeDTO[]): void {
    // Initialize hike instances
    hikes.forEach((hike, index) => {
      const startPoint = new HikeCoordinatesDTO(hike.startPoint.latitude, hike.startPoint.longitude, new Date());
      const endPoint = new HikeCoordinatesDTO(hike.endPoint.latitude, hike.endPoint.longitude, new Date());

      const newHike = new HikeDTO(
        hike.id,
        hike.name,
        hike.location,
        hike.description,
        hike.image,
        hike.type,
        hike.distance,
        hike.timeEstimated,
        startPoint,
        endPoint
      );
    });
  }
}
