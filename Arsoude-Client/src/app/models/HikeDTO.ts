export enum hikeType {
    bike,
    walk
  }

export class HikeDTO{
    constructor(
        public id :number, 
        public userId : number,
        public name : String, 
        public description : String,
        public image : String,
        public creationDate : Date ,//a changer peut-etre!!!!!!!
        public validatedDate  : Date, // not needed yet
        public timeEstimated : Date, //a changer peut-etre!!!!!!!
        public type : hikeType,
        //public distance : number , //besoin???
        public isValidated : boolean, //not needed yet
        public startPoint : number, //double en angular?
        public endPoint : number, //double en angular?
        //map???
        

        ){} 
    }

