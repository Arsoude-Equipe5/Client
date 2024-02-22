import { Component, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikePathDTO, hikeStatus, hikeType } from 'src/app/models/HikePathDTO';
import { HikeService } from 'src/app/services/HikeServices';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit{
  startPoint1 = new HikeCoordinatesDTO(37.7749, -122.4194, new Date());
  endPoint1 = new HikeCoordinatesDTO(40.7128, -74.0060, new Date());

  hikeStatus = hikeStatus;


  @Input() updateStatusCallback?: (hikeId: number, newStatus: number) => void;




  getColor(status: number): string {
    switch(status) {
      case hikeStatus.pending: return 'blue';
      case hikeStatus.validated: return 'green';
      case hikeStatus.rejected: return 'red';
      default: return 'black';
    }
  }

  getHikeStatusName(status: number): string {
    return hikeStatus[status]?.toUpperCase() || 'UNKNOWN';
  }

  callUpdateStatusCallback(hikeId: number, newStatus: number): void {
    if (this.updateStatusCallback) {
      this.updateStatusCallback(hikeId, newStatus);
      this.hike = { ...this.hike, status: newStatus };
      this.changeDetectorRef.markForCheck();
      this.changeDetectorRef.detectChanges();
    } else {
      console.warn('updateStatusCallback is undefined.');
    }
  }
  

  safeUpdateStatus(hikeId: number, newStatus: number) {
    if (this.updateStatusCallback) {
      this.updateStatusCallback(hikeId, newStatus);
    } else {
      console.warn('updateStatusCallback is not defined.');
    }
  }

  constructor(private changeDetectorRef: ChangeDetectorRef,public hikeService:HikeService, private authService: AuthService) {
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }


  async onButtonClick(id: number, hike:HikePathDTO): Promise<void> {
    await this.hikeService.addFavouriteHikes(id);
    await this.toggleFavourite(hike);
    
  }


  async toggleFavourite(hike: HikePathDTO): Promise<void> {

    //Display icon when the hike is not in favourite (empty star)
    const isNotInFavouriteIcon: String= "far fa-regular fa-star";


    if (this.hikeService.isInFavourite(hike) === isNotInFavouriteIcon) {
      await this.hikeService.myFavouriteList.push(hike); // Add to favorites
    } else {
      // Remove from favorites
      this.hikeService.myFavouriteList = this.hikeService.myFavouriteList.filter(favorite => favorite.id !== hike.id);
    }
  }
  

  @Input() hike:HikePathDTO = new HikePathDTO(
    1,
    "Hike 1",
    "Location 1",
    "Description 1",
    "Image URL 1",
    hikeType.bike,
    hikeStatus.pending,
    10.2,
    "1.2",
    this.startPoint1,
    this.endPoint1
  );
  
 


  @Input() center:google.maps.LatLngLiteral = {lat: 42, lng: -4};
  @Input() zoom:number = 5;

  markerPositions: google.maps.LatLngLiteral[] = [
    {lat: this.hike.startPoint.latitude, lng: this.hike.startPoint.longitude},
    {lat: this.hike.endPoint.latitude, lng: this.hike.endPoint.longitude}
  ];


  ngOnInit() {
  }


  isAdmin(): boolean {
    return this.authService.isAdmin();
  }
  

}
