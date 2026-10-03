import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export type TreatmentPlanStatus =
  | 'in_progress'
  | 'completed'
  | 'incomplete'
  | 'cancelled';
export interface TreatmentPlan {
  id: number;

  patient: number;
  patient_name: string;

  doctor: number;
  doctor_name: string;

  specialty: number;
  specialty_name: string;

  title: string;
  description: string;

  start_date: string;
  end_date: string | null;

  status: TreatmentPlanStatus;

  notes: string;

  created_at: string;
  updated_at: string;
}

export interface CreateTreatmentPlanRequest {
  patient: number;
  doctor: number;
  specialty: number;

  title: string;
  description: string;

  start_date: string;
  end_date?: string | null;

  status: TreatmentPlanStatus;

  notes?: string;
}

export type UpdateTreatmentPlanRequest =
  Partial<CreateTreatmentPlanRequest>;

@Injectable({
  providedIn: 'root'
})
export class TreatmentPlanService {

  private readonly apiUrl =
    'http://127.0.0.1:8000/api/appointments/treatment-plans/';

  constructor(
    private readonly http: HttpClient
  ) {}

  getByNationalCode(
    nationalCode: string
  ): Observable<TreatmentPlan[]> {

    return this.http.get<TreatmentPlan[]>(
      `${this.apiUrl}?national_code=${encodeURIComponent(nationalCode)}`
    );
  }

  create(
    data: CreateTreatmentPlanRequest
  ): Observable<TreatmentPlan> {

    return this.http.post<TreatmentPlan>(
      this.apiUrl,
      data
    );
  }

  update(
    id: number,
    data: UpdateTreatmentPlanRequest
  ): Observable<TreatmentPlan> {

    return this.http.put<TreatmentPlan>(
      `${this.apiUrl}${id}/`,
      data
    );
  }

  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}${id}/`
    );
  }
}