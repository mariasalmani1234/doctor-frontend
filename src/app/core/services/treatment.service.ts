import { Injectable } from '@angular/core';
import { Observable, delay, of } from 'rxjs';

import { Treatment } from '../../models/treatment.model';
import { TreatmentStatus } from '../enums/treatment-status.enum';

@Injectable({
  providedIn: 'root'
})
export class TreatmentService {

 private treatments: Treatment[] = [

    {
      id:1,
      patientId:1,
      title:'درمان ریشه دندان ۱۶',
      diagnosis:'پالپیت دندان',
      toothNumber:16,
      startDate:'1403/01/15',
      endDate:'1403/01/25',
      description:'درمان ریشه دندان شماره ۱۶',
      status:TreatmentStatus.Completed,
      createdAt:'1403/01/10'
    },
    
    
    
    {
      id:2,
      patientId:1,
      title:'روکش دندان ۲۴',
      diagnosis:'نیاز به روکش بعد از درمان',
      toothNumber:24,
      startDate:'1403/02/10',
      endDate:'1403/02/20',
      description:'ساخت و نصب روکش دندان ۲۴',
      status:TreatmentStatus.InProgress,
      createdAt:'1403/02/01'
    },
    
    
    
    
    {
      id:3,
      patientId:1,
      title:'ترمیم کامپوزیت دندان ۳۶',
      diagnosis:'پوسیدگی',
      toothNumber:36,
      startDate:'1403/03/05',
      endDate:'1403/03/05',
      description:'ترمیم کامپوزیت',
      status:TreatmentStatus.InProgress,
      createdAt:'1403/03/01'
    },
    
    
    
    
    {
      id:4,
      patientId:1,
      title:'جرمگیری و بروساژ',
      diagnosis:'جرم دندانی',
      toothNumber:null,
      startDate:'1403/04/10',
      description:'جرمگیری کامل',
      status:TreatmentStatus.Incomplete,
      createdAt:'1403/04/01'
    },
    
    
    
    
    {
      id:5,
      patientId:1,
      title:'ایمپلنت دندان ۴۷',
      diagnosis:'فقدان دندان',
      toothNumber:47,
      startDate:'1403/05/10',
      description:'شروع مراحل ایمپلنت',
      status:TreatmentStatus.InProgress,
      createdAt:'1403/05/01'
    }

];
  constructor() {}

  getByPatientId(patientId: number): Observable<Treatment[]> {

    const result = this.treatments.filter(
      item => item.patientId === patientId
    );

    return of(result).pipe(
      
    );
  }

  getById(id: number): Observable<Treatment | null> {

    const treatment = this.treatments.find(
      item => item.id === id
    );

    return of(treatment ?? null).pipe(
      
    );
  }

  create(
    treatment: Omit<Treatment, 'id' | 'createdAt' | 'updatedAt'>
  ): Observable<Treatment> {

    const newTreatment: Treatment = {
      ...treatment,
      id: this.treatments.length + 1,
      createdAt: new Date().toISOString()
    };

    this.treatments.push(newTreatment);

    return of(newTreatment).pipe(
      
    );
  }

  update(
    id: number,
    data: Partial<Treatment>
  ): Observable<Treatment | null> {

    const index = this.treatments.findIndex(
      item => item.id === id
    );

    if (index === -1) {
      return of(null);
    }

    this.treatments[index] = {
      ...this.treatments[index],
      ...data,
      updatedAt: new Date().toISOString()
    };

    return of(this.treatments[index]).pipe(
      
    );
  }

  delete(id: number): Observable<boolean> {

    const index = this.treatments.findIndex(
      item => item.id === id
    );

    if (index === -1) {
      return of(false);
    }

    this.treatments.splice(index, 1);

    return of(true).pipe(
     
    );
  }
}