import {
  Injectable,
  inject
} from '@angular/core';


import {
  HttpClient
} from '@angular/common/http';


import {
  Observable,
  map
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
    'http://localhost:8000/api/treatments';



  getByPatientId(
    patientId: number
  ): Observable<Treatment[]> {

    return this.http.get<Treatment[]>(
      `${this.apiUrl}/?patient_id=${patientId}`
    );

  }



  getById(
    id: number
  ): Observable<Treatment | null> {

    return this.http.get<Treatment>(
      `${this.apiUrl}/${id}/`
    );

  }



  create(
    treatment: Omit<
      Treatment,
      'id' |
      'createdAt' |
      'updatedAt'
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
  ): Observable<Treatment | null> {

    return this.http.put<Treatment>(
      `${this.apiUrl}/${id}/`,
      data
    );

  }



  delete(
    id: number
  ): Observable<boolean> {

    return this.http.delete(
      `${this.apiUrl}/${id}/`
    ).pipe(

      map(() => true)

    );

  }

}