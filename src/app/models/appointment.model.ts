export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled';


export interface Appointment {


  id:number;


  patientId:number;


  patientName:string;


  doctorId:number;



  date:string;


  time:string;



  status:AppointmentStatus;



  description?:string;



  createdAt?:string;


}