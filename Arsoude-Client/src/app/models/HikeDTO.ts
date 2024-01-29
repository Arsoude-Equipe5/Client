import { HikeCoordinatesDTO } from "./HikeCoordinatesDTO";

export enum hikeType {
    bike,
    walk
  }

export class HikeDTO{
    constructor(
        public name : String, 
        public location : String,
        public description : String,
        public image : String,
        public type : hikeType,
        public startPoint : HikeCoordinatesDTO,
        public endPoint : HikeCoordinatesDTO
        

        ){} 
    }

