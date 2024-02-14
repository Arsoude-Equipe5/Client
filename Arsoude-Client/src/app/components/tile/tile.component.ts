import { Component, Input, OnInit } from '@angular/core';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikeDTO, hikeType } from 'src/app/models/HikeDTO';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.css']
})
export class TileComponent implements OnInit{
  startPoint1 = new HikeCoordinatesDTO(37.7749, -122.4194, new Date());
  endPoint1 = new HikeCoordinatesDTO(40.7128, -74.0060, new Date());

  @Input() hike:HikeDTO = new HikeDTO(
    1,
    "Hike 1",
    "Location 1",
    "Description 1",
    "Image URL 1",
    hikeType.bike,
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

}
