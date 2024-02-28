import { Component, Input, OnInit, OnChanges, SimpleChanges, ChangeDetectorRef, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { FollowedHikeDTO } from 'src/app/models/FollowedHikeDTO';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikePathDTO, hikeStatus, hikeType } from 'src/app/models/HikePathDTO';
import { HikeService } from 'src/app/services/HikeServices';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-tile',
  templateUrl: './admin-tile.component.html',
  styleUrls: ['./admin-tile.component.css']
})
export class AdminTileComponent implements OnInit, OnChanges {
  startPoint1 = new HikeCoordinatesDTO(37.7749, -122.4194, new Date());
  endPoint1 = new HikeCoordinatesDTO(40.7128, -74.0060, new Date());
  pathCoordinates: HikeCoordinatesDTO[] = [
    new HikeCoordinatesDTO(37.7749, -122.4194, new Date())
];

recPath = new FollowedHikeDTO(
  1, 
  '2h 30m', 
  15.5, 
  this.pathCoordinates 
);
  
  hikeStatus = hikeStatus;
  @Input() updateStatusCallback?: (hikeId: number, newStatus: number) => void;
  @Input() hike: HikePathDTO = new HikePathDTO(
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
    this.endPoint1,
    this.recPath
  );

  @Input() center: google.maps.LatLngLiteral = {lat: 42, lng: -4};
  @Input() zoom: number = 5;
  @ViewChild(GoogleMap, {static: false}) map!: GoogleMap;
  
  //initialize markerPositions here
  markerPositions: google.maps.LatLngLiteral[];
  polylinePath: google.maps.LatLngLiteral[] = [];
  polylineOptions: google.maps.PolylineOptions = {
  strokeColor: '#4CBB17',
  strokeOpacity: 1.0,
  strokeWeight: 5
};

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    public hikeService: HikeService, 
    private authService: AuthService
  ) {
    this.markerPositions = []; // Initialize as an empty array
  }

  ngOnInit(): void {
    this.updateMarkerPositions(); // Ensure marker positions are updated on init
    this.updateRecommendedPathPolyline();
  }

  updateRecommendedPathPolyline(): void {
    if (this.hike.recommendedPath && this.hike.recommendedPath.path) {
      this.polylinePath = this.hike.recommendedPath.path.map(coordinate => {
        return { lat: coordinate.latitude, lng: coordinate.longitude };
      });
    }
  }

  ngAfterViewInit(): void {
    this.updateMapView();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // This method will be called when any input properties change
    if (changes['hike']) {
      this.updateMarkerPositions();
    }
  }

  updateMarkerPositions(): void {
    if (this.hike.startPoint && this.hike.endPoint) {
      this.markerPositions = [
        { lat: this.hike.startPoint.latitude, lng: this.hike.startPoint.longitude },
        { lat: this.hike.endPoint.latitude, lng: this.hike.endPoint.longitude }
      ];
    }
  }

  
  updateMapView(): void {
    if (this.map && this.hike.startPoint && this.hike.endPoint) {
      const bounds = new google.maps.LatLngBounds();
      bounds.extend(new google.maps.LatLng(this.hike.startPoint.latitude, this.hike.startPoint.longitude));
      bounds.extend(new google.maps.LatLng(this.hike.endPoint.latitude, this.hike.endPoint.longitude));
      
      // Use setTimeout to ensure the map instance is updated after view initialization
      setTimeout(() => this.map.fitBounds(bounds), 0);
    }
  }


  calculateMidpoint(startPoint: HikeCoordinatesDTO, endPoint: HikeCoordinatesDTO): google.maps.LatLngLiteral {
    const midLat = (startPoint.latitude + endPoint.latitude) / 2;
    const midLng = (startPoint.longitude + endPoint.longitude) / 2;
    return { lat: midLat, lng: midLng };
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  isAdmin(): boolean {
    return this.authService.isAdmin();
  }

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

  safeUpdateStatus(hikeId: number, newStatus: number): void {
    if (this.updateStatusCallback) {
      this.updateStatusCallback(hikeId, newStatus);
    } else {
      console.warn('updateStatusCallback is not defined.');
    }
  }

 
}
