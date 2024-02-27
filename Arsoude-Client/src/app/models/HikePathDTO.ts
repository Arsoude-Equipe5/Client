import { FollowedHikeDTO } from "./FollowedHikeDTO";
import { HikeCoordinatesDTO } from "./HikeCoordinatesDTO";

export enum hikeType {
    bike,
    walk
  }

  export enum hikeStatus {
    pending,
    validated,
    rejected
  }

export class HikePathDTO{
    constructor(
        public id: number,
        public name : String, 
        public location : String,
        public description : String,
        public image : String,
        public type : hikeType,
        public status : hikeStatus,
        public distance : number,
        public timeEstimated : string,
        public startPoint : HikeCoordinatesDTO,
        public endPoint : HikeCoordinatesDTO,
        public RecommendedPath? : FollowedHikeDTO
        ){} 
    }

