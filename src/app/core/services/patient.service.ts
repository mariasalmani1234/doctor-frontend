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
  Patient
} from '../../models/patient.model';



@Injectable({
  providedIn: 'root'
})
export class PatientService {


  private http =
    inject(HttpClient);


  private apiUrl =
    'http://localhost:8000/api/patients';



  getByNationalCode(
    nationalCode: string
  ): Observable<Patient | null> {

    return this.http.get<Patient>(
      `${this.apiUrl}/search/?national_code=${encodeURIComponent(nationalCode)}`
    );

  }



  getById(
    id: number
  ): Observable<Patient | null> {

    return this.http.get<Patient>(
      `${this.apiUrl}/${id}/`
    );

  }

}