import {
  Injectable,
  inject
} from '@angular/core';

import {
  Observable,
  of,
  delay
} from 'rxjs';

import { Patient }
from '../../models/patient.model';



@Injectable({
  providedIn:'root'
})
export class PatientService {


  private patients: Patient[] = [


    {
      id:1,
      nationalCode:'0012345678',
      firstName:'علی',
      lastName:'احمدی',
      fatherName:'محمد',
      birthDate:'1375/05/12',
      phone:'09121234567'
    },


    {
      id:2,
      nationalCode:'0023456789',
      firstName:'رضا',
      lastName:'کریمی',
      fatherName:'حسن',
      birthDate:'1368/09/20',
      phone:'09129876543'
    }


  ];





  getByNationalCode(
    nationalCode:string
  ):Observable<Patient|null>{


    const patient =
    this.patients.find(
      item =>
      item.nationalCode === nationalCode
    );


    return of(patient ?? null)
    .pipe(
      delay(400)
    );


  }





  getById(
    id:number
  ):Observable<Patient|null>{


    const patient =
    this.patients.find(
      item =>
      item.id === id
    );


    return of(patient ?? null)
    .pipe(
      delay(300)
    );


  }





}