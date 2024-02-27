import { HikeCoordinatesDTO } from './HikeCoordinatesDTO';

export class FollowedHikeDTO {
  HikeId: number;
  Duration: string; 
  Distance: number;
  Path: HikeCoordinatesDTO[];

  constructor(hikeId: number, duration: string, distance: number, path: HikeCoordinatesDTO[]) {
    this.HikeId = hikeId;
    this.Duration = duration;
    this.Distance = distance;
    this.Path = path;
  }
}
