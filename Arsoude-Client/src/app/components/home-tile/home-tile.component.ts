import { Component, Input } from '@angular/core';
import { HikeCoordinatesDTO } from 'src/app/models/HikeCoordinatesDTO';
import { HikePathDTO, hikeStatus, hikeType } from 'src/app/models/HikePathDTO';

@Component({
  selector: 'app-home-tile',
  templateUrl: './home-tile.component.html',
  styleUrls: ['./home-tile.component.css']
})
export class HomeTileComponent {
  startPoint1 = new HikeCoordinatesDTO(37.7749, -122.4194, new Date());
  endPoint1 = new HikeCoordinatesDTO(40.7128, -74.0060, new Date());
  
  @Input() img:String = "";
  @Input() name:String = "";
  @Input() type:hikeType = hikeType.walk;
}
