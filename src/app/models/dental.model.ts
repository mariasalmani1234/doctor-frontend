export type DentalToothStatus =
  | 'healthy'
  | 'filled'
  | 'root-canal'
  | 'crown'
  | 'extracted'
  | 'implant';


export interface DentalTooth {
  number: number;
  status: DentalToothStatus;
  lastTreatment?: string;
}


export interface DentalTreatment {
  id: number;
  toothNumber: number;
  service: DentalToothStatus;
  serviceLabel: string;
  date: string;
  notes: string;
}