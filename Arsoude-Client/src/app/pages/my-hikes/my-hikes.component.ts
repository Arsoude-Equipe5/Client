import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HikeService } from 'src/app/services/HikeServices';

@Component({
  selector: 'app-my-hikes',
  templateUrl: './my-hikes.component.html',
  styleUrls: ['./my-hikes.component.css']
})
export class MyHikesComponent implements OnInit {

  inputKeyword = new FormControl('');

  searchKeyword: string = '';

  type: string | null = null;

  constructor(public hikeService:HikeService) { }
  ngOnInit(): void {
    this.hikeService.getMyHikes();
  }

 
  onSubmit() {
    const token = localStorage.getItem('token');

    if (!token) {
      alert('You are not connected. Please log in to search hikes.');
      return; // Stop further execution
    }

    this.hikeService.searchMyHikes(this.inputKeyword.value, this.type);
  }


  toggleHikeType(type: string) {
    if (this.type === type) {
      this.type = null; // Deselect if already selected
    } else {
      this.type = type; // Select if not selected
    }
  }


 
}
