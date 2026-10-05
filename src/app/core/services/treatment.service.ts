import {
  Injectable,
  inject
} from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable
} from 'rxjs';

import {
  Treatment
} from '../../models/treatment.model';


@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://127.0.0.1:8000/api/treatments';


  getByPatientId(
    patientId: number
  ): Observable<Treatment[]> {

    return this.http.get<Treatment[]>(
      `${this.apiUrl}/?patient_id=${patientId}`
    );

  }


  getById(
    id: number
  ): Observable<Treatment> {

    return this.http.get<Treatment>(
      `${this.apiUrl}/${id}/`
    );

  }


  create(
    treatment: Omit<
      Treatment,
      'id' | 'createdAt'
    >
  ): Observable<Treatment> {

    return this.http.post<Treatment>(
      `${this.apiUrl}/`,
      treatment
    );

  }


  update(
    id: number,
    data: Partial<Treatment>
  ): Observable<Treatment> {

    return this.http.patch<Treatment>(
      `${this.apiUrl}/${id}/`,
      data
    );

  }


  delete(
    id: number
  ): Observable<void> {

    return this.http.delete<void>(
      `${this.apiUrl}/${id}/`
    );

  }

}