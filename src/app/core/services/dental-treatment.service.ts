import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import {
  DentalTreatment
} from '../../models/dental.model';


import {
  Observable
} from 'rxjs';



@Injectable({
  providedIn:'root'
})
export class DentalTreatmentService {


  private http = inject(HttpClient);


  private apiUrl =
  'http://localhost:8000/api/dental-treatments';



  getByPatient(
    patientId:number
  ):Observable<DentalTreatment[]> {


    return this.http.get<DentalTreatment[]>(
      `${this.apiUrl}/patient/${patientId}/`
    );

  }




  create(
    data:DentalTreatment
  ):Observable<DentalTreatment>{


    return this.http.post<DentalTreatment>(
      this.apiUrl + '/',
      data
    );


  }




  update(
    id:number,
    data:DentalTreatment
  ):Observable<DentalTreatment>{


    return this.http.put<DentalTreatment>(
      `${this.apiUrl}/${id}/`,
      data
    );


  }




  delete(
    id:number
  ):Observable<void>{


    return this.http.delete<void>(
      `${this.apiUrl}/${id}/`
    );


  }


}