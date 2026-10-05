import { TreatmentStatus }
from '../core/enums/treatment-status.enum';


export interface Treatment {

  id: number;

  patientId: number;

  patientName?: string;

  doctorId?: number;

  title: string;

  diagnosis: string;

  toothNumber?: number | null;

  status: TreatmentStatus;

  startDate: string;

  endDate?: string | null;

  description?: string;

  createdAt?: string;

  updatedAt?: string;

}