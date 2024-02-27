import { HikeCoordinatesDTO } from './HikeCoordinatesDTO';

export class FollowedHikeDTO {
  hikeId: number;
  duration: string; 
  distance: number;
  path: HikeCoordinatesDTO[];

  constructor(hikeId: number, duration: string, distance: number, path: HikeCoordinatesDTO[]) {
    this.hikeId = hikeId;
    this.duration = duration;
    this.distance = distance;
    this.path = path;
  }
}
