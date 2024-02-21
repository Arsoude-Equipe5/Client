import { HikeCoordinatesDTO } from './HikeCoordinatesDTO';

export enum hikeType {
  bike,
  walk,
}

export enum HikeStatus {
  Pending,
  Validated,
  Rejected,
}

export class HikeDTO {
  constructor(
    public id: number,
    public name: String,
    public location: String,
    public description: String,
    public image: String,
    public type: hikeType,
    public distance: number,
    public timeEstimated: string,
    public startPoint: HikeCoordinatesDTO,
    public endPoint: HikeCoordinatesDTO,
    public status: HikeStatus,
    public isMine?: boolean,
    public userId?: string
  ) {}
}
