import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Doctor } from '../../models/doctor.model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

  private apiUrl = 'http://127.0.0.1:8000/api/doctors/';

  constructor(private http: HttpClient) {}

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl);
  }

  getDoctorsBySpecialty(specialtyId: number): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(
      `${this.apiUrl}?specialty=${specialtyId}`
    );
  }

  getDoctorsByCity(city: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(
      `${this.apiUrl}?city=${city}`
    );
  }

  searchDoctors(search: string): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(
      `${this.apiUrl}?search=${search}`
    );
  }
}