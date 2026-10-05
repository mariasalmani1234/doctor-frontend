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
  Patient
} from '../../models/patient.model';


@Injectable({
  providedIn: 'root'
})
export class PatientService {


  private http =
    inject(HttpClient);


  private apiUrl =
    'http://127.0.0.1:8000/api/patients';



  getById(
    id: number
  ): Observable<Patient> {

    return this.http.get<Patient>(
      `${this.apiUrl}/${id}/`
    );

  }




  getByNationalCode(
    nationalCode: string
  ): Observable<Patient> {


    const params =
      new HttpParams()
        .set(
          'national_code',
          nationalCode
        );


    return this.http.get<Patient>(
      `${this.apiUrl}/search/`,
      {
        params
      }
    );

  }




  search(
    nationalCode: string
  ): Observable<Patient> {


    const params =
      new HttpParams()
        .set(
          'national_code',
          nationalCode
        );


    return this.http.get<Patient>(
      `${this.apiUrl}/search/`,
      {
        params
      }
    );

  }


}