import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikePathDTO, hikeStatus, hikeType } from 'src/app/models/HikePathDTO';
import { HikeService } from 'src/app/services/HikeServices';
import { AuthService } from 'src/app/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-hikes',
  templateUrl: './admin-hikes.component.html',
  styleUrls: ['./admin-hikes.component.css']
})
export class AdminHikesComponent implements OnInit, OnDestroy {


  center: google.maps.LatLngLiteral = { lat: 42, lng: -4 };
  zoom = 5;
  hikesList: HikePathDTO[] = [];
  inputKeyword = new FormControl('');
  tags: string[] = [];
  searchKeyword: string = "";
  type: string = '';
  statusFilter = new FormControl('');
  private subscription: Subscription | undefined;

  constructor(public hikeService: HikeService, private authService: AuthService) {
    this.hikeService.getAdminHikes();
    this.hikesList = [];
  }


  ngOnInit() {
    this.subscription = this.statusFilter.valueChanges.subscribe(filter => {
      this.hikeService.getAdminHikes(filter ?? undefined);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onSubmit() {
    if (this.inputKeyword.value) {
      this.hikeService.searchHikes(this.inputKeyword.value, this.type);
    }
    else {
      this.hikeService.getAdminHikes(this.statusFilter.value ?? undefined);
    }
  }


  updateStatus(hikeId: number, newStatus: number): void {
    console.log(`Updating hike #${hikeId} to status ${newStatus}`);
    this.hikeService.updateHikeStatus(hikeId, newStatus).subscribe({
      next: (response) => {
        console.log('Status updated successfully', response);
        // Refresh your hike list or individual hike status here
      },
      error: (error) => {
        console.error('Error updating hike status', error);
      }
    });
  }
  


}

