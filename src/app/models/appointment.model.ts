export type AppointmentStatus =
  | 'PENDING'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'CANCELLED';

export interface Appointment {

  id: number;

  patientId: number;

  patientName: string;

  doctorId: number;

  date: string;

  time: string;

  status: AppointmentStatus;

  createdAt?: string;

}