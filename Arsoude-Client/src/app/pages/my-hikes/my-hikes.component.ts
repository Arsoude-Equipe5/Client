import { Component, OnInit } from '@angular/core';
import { HikeService } from 'src/app/services/HikeServices';

@Component({
  selector: 'app-my-hikes',
  templateUrl: './my-hikes.component.html',
  styleUrls: ['./my-hikes.component.css']
})
export class MyHikesComponent implements OnInit {



  constructor(public hikeService:HikeService) { }
  ngOnInit(): void {
    this.hikeService.getMyHikes();
  }

 
 
}
