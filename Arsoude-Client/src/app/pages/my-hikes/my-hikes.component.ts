import { Component, Input, OnInit } from '@angular/core';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikePathDTO, hikeStatus, hikeType } from 'src/app/models/HikePathDTO';
import { HikeService } from 'src/app/services/HikeServices';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-my-hikes',
  templateUrl: './my-hikes.component.html',
  styleUrls: ['./my-hikes.component.css'],
})
export class MyHikesComponent implements OnInit {
  startPoint1 = new HikeCoordinatesDTO(37.7749, -122.4194, new Date());
  endPoint1 = new HikeCoordinatesDTO(40.7128, -74.006, new Date());
  showStatus: boolean = true;
  constructor(
    public hikeService: HikeService,
    public authService: AuthService
  ) {}
  ngOnInit(): void {
    this.hikeService.getMyHikes();
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  @Input() hike: HikePathDTO = new HikePathDTO(
    1,
    'Hike 1',
    'Location 1',
    'Description 1',
    'Image URL 1',
    hikeType.bike,
    hikeStatus.pending,
    10.2,
    '1.2',
    this.startPoint1,
    this.endPoint1
  );

  @Input() center: google.maps.LatLngLiteral = { lat: 42, lng: -4 };
  @Input() zoom: number = 5;

  markerPositions: google.maps.LatLngLiteral[] = [
    { lat: this.hike.startPoint.latitude, lng: this.hike.startPoint.longitude },
    { lat: this.hike.endPoint.latitude, lng: this.hike.endPoint.longitude },
  ];
}
