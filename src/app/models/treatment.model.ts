import {
  TreatmentStatus
} from '../core/enums/treatment-status.enum';


export interface Treatment {

  id: number;

  patientId: number;

  doctorId?: number;

  title: string;

  diagnosis?: string;

  toothNumber?: number | null;

  startDate: string;

  endDate?: string | null;

  description?: string;

  status: TreatmentStatus;

  createdAt?: string;

  updatedAt?: string;

}