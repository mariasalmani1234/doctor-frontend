import { TreatmentStatus } from "../core/enums/treatment-status.enum";


export interface Treatment {


  id:number;


  patientId:number;


  title:string;


  diagnosis?:string;


  startDate?:string;


  endDate?:string;


  description?:string;


  status:TreatmentStatus;



  toothNumber?:number | null;


  createdAt?:string;


  updatedAt?:string;


}