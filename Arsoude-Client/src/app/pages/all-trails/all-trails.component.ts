import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikeDTO, HikeStatus, hikeType } from 'src/app/models/HikeDTO';
import { HikeService } from 'src/app/services/HikeServices';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-all-trails',
  templateUrl: './all-trails.component.html',
  styleUrls: ['./all-trails.component.css'],
})
export class AllTrailsComponent {
  center: google.maps.LatLngLiteral = { lat: 42, lng: -4 };
  zoom = 5;
  hikesList: HikeDTO[] = [];
  inputKeyword = new FormControl('');
  tags: string[] = [];
  searchKeyword: string = '';
  type: string | null = null;
  userId: string | null = null;

  constructor(
    public hikeService: HikeService,
    private authService: AuthService
  ) {
    authService.getUserId();
    this.hikeService.getHikes();
    this.hikeService.getFavouriteHikes();

    const startPoint1 = new HikeCoordinatesDTO(37.7749, -122.4194, new Date());
    const endPoint1 = new HikeCoordinatesDTO(40.7128, -74.006, new Date());

    const startPoint2 = new HikeCoordinatesDTO(34.0522, -118.2437, new Date());
    const endPoint2 = new HikeCoordinatesDTO(41.8781, -87.6298, new Date());
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  async onButtonClick(id: number, hike: HikeDTO): Promise<void> {
    await this.hikeService.addFavouriteHikes(id);
    await this.toggleFavourite(hike);
  }

  setHikeType(type: string) {
    this.type = type;
    console.log(this.type);
  }

  toggleHikeType(type: string) {
    if (this.type === type) {
      this.type = null; // Deselect if already selected
    } else {
      this.type = type; // Select if not selected
    }
  }

  onSubmit() {
    this.hikeService.searchHikes(this.inputKeyword.value, this.type);
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

  splitKeywords() {
    if (this.searchKeyword) {
      // Split the search keyword phrase into individual words
      const words = this.searchKeyword.split(' ');
      // Update the tags array with individual words
      this.tags = words.filter((word) => word.trim() !== '');
    } else {
      this.tags = [];
    }
  }
}
