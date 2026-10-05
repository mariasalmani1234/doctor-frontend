import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient,
  HttpParams
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Appointment,
  AppointmentStatus
} from '../../models/appointment.model';

export interface DoctorDashboardStats {
  todayPatients: number;
  activeRecords: number;
  pendingTreatments: number;
}

export interface DoctorSchedule {

  id: number;

  doctorId: number;

  dayOfWeek: number;

  startTime: string;

  endTime: string;

  isActive: boolean;

}


export interface CreateAppointmentRequest {

  doctorId: number;

  date: string;

  time: string;

}


@Injectable({
  providedIn: 'root'
})
export class AppointmentService {

  getDoctorDashboardStats(): Observable<DoctorDashboardStats> {

  return this.http.get<DoctorDashboardStats>(
    `${this.apiUrl}/dashboard-stats/`
  );

 } 
  private http =
    inject(HttpClient);


  private apiUrl =
    'http://127.0.0.1:8000/api/appointments';


  getAll(): Observable<Appointment[]> {

    return this.http.get<Appointment[]>(
      `${this.apiUrl}/`
    );

  }


  getByDoctorId(
    doctorId: number
  ): Observable<Appointment[]> {

    const params =
      new HttpParams()
        .set(
          'doctor_id',
          doctorId
        );

    return this.http.get<Appointment[]>(
      `${this.apiUrl}/`,
      {
        params
      }
    );

  }


  getByPatientId(
    patientId: number
  ): Observable<Appointment[]> {

    const params =
      new HttpParams()
        .set(
          'patient_id',
          patientId
        );

    return this.http.get<Appointment[]>(
      `${this.apiUrl}/`,
      {
        params
      }
    );

  }


  getById(
    id: number
  ): Observable<Appointment> {

    return this.http.get<Appointment>(
      `${this.apiUrl}/${id}/`
    );

  }


  getSchedulesByDoctorId(
  doctorId: number,
  date?: string
 ): Observable<DoctorSchedule[]> {

  let params =
    new HttpParams()
      .set(
        'doctor_id',
        doctorId
      );

  if (date) {

    params =
      params.set(
        'date',
        date
      );

  }

  return this.http.get<DoctorSchedule[]>(
    `${this.apiUrl}/schedules/`,
    {
      params
    }
  );

}


  create(
    data: CreateAppointmentRequest
  ): Observable<Appointment> {

    return this.http.post<Appointment>(
      `${this.apiUrl}/`,
      data
    );

  }


  updateStatus(
    id: number,
    status: AppointmentStatus
  ): Observable<Appointment> {

    return this.http.patch<Appointment>(
      `${this.apiUrl}/${id}/`,
      {
        status
      }
    );

  }


  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}/`
    );

  }

  getBookedTimes(
  doctorId: number,
  date: string
): Observable<{ times: string[] }> {

  const params =
    new HttpParams()
      .set(
        'doctor_id',
        doctorId
      )
      .set(
        'date',
        date
      );

  return this.http.get<{ times: string[] }>(
    `${this.apiUrl}/booked-times/`,
    {
      params
    }
  );

}

}