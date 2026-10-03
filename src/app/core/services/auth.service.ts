import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

export interface LoginResponse {
  access: string;
  refresh: string;
  user: {
    id: number;
    national_code: string;
    first_name: string;
    last_name: string;
    role: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api/auth';

  constructor(
    private http: HttpClient
  ) {}

  register(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/register/`,
      data
    ); 
  }

  login(
    national_code: string,
    password: string
  ): Observable<LoginResponse> {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login/`,
      {
        national_code,
        password
      }
    ).pipe(

      tap(response => {

        localStorage.setItem(
          'access',
          response.access
        );

        localStorage.setItem(
          'refresh',
          response.refresh
        );

        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );

      })

    );
  }

  logout(): void {

    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('access');
  }

  getCurrentUser(): any {

    const user = localStorage.getItem('user');

    return user
      ? JSON.parse(user)
      : null;
  }

  getPatientByNationalCode(
  nationalCode: string): Observable<any> {
  return this.http.get<any>(
    `http://127.0.0.1:8000/api/patients/search/?national_code=${nationalCode}`
  );
}
}