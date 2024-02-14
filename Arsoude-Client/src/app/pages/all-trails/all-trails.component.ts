import { Component } from '@angular/core';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikeDTO, hikeType } from 'src/app/models/HikeDTO';
import { HikeService } from 'src/app/services/HikeServices';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-trails',
  templateUrl: './all-trails.component.html',
  styleUrls: ['./all-trails.component.css']
})
export class AllTrailsComponent {
  center: google.maps.LatLngLiteral = {lat: 42, lng: -4};
  zoom = 5;
  hikesList: HikeDTO[] =[];

  constructor(public hikeService:HikeService, private authService: AuthService) {
    
      this.hikeService.getHikes()
      

const startPoint1 = new HikeCoordinatesDTO(37.7749, -122.4194, new Date());
const endPoint1 = new HikeCoordinatesDTO(40.7128, -74.0060, new Date());

const startPoint2 = new HikeCoordinatesDTO(34.0522, -118.2437, new Date());
const endPoint2 = new HikeCoordinatesDTO(41.8781, -87.6298, new Date());


// Create instances of HikeDTO using the coordinates
const hike1 = new HikeDTO(
  1,
  "Hike 1",
  "Location 1",
  "Description 1",
  "Image URL 1",
  hikeType.bike,
  startPoint1,
  endPoint1
);

const hike2 = new HikeDTO(
  2,
  "Hike 2",
  "Location 2",
  "Description 2",
  "Image URL 2",
  hikeType.walk,
  startPoint2,
  endPoint2
);

// Create a list of HikeDTO instances
//const hikesList: HikeDTO[] = [hike1, hike2];
this.hikesList = [hike1,hike2];

    }


    isLoggedIn(): boolean {
      return this.authService.isLoggedIn();
    }


    async onButtonClick(id: number, hike:HikeDTO): Promise<void> {
      await this.hikeService.addFavouriteHikes(id);
      await this.toggleFavourite(hike);
      
    }
  

    async toggleFavourite(hike: HikeDTO): Promise<void> {
      if (this.hikeService.isInFavourite(hike) === "far fa-regular fa-star") {
        await this.hikeService.myFavouriteList.push(hike); // Add to favorites
      } else {
        // Remove from favorites
        this.hikeService.myFavouriteList = this.hikeService.myFavouriteList.filter(favorite => favorite.id !== hike.id);
      }
    }

    markerPositions: google.maps.LatLngLiteral[] = [
      {lat: 42, lng: -4},
      {lat: 40, lng: -0},
    ];


}

