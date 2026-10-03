// وضعیت ظاهری دندان در چارت

export type DentalToothStatus =

  | 'healthy'
  | 'filled'
  | 'root-canal'
  | 'crown'
  | 'implant'
  | 'extracted';





// اطلاعات هر دندان روی چارت

export interface DentalTooth {


  number:number;


  status:DentalToothStatus;


  lastTreatment?:string;


}