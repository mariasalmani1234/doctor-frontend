import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  national_code = '';
  password = '';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {

    this.errorMessage = '';

    this.authService.login(
      this.national_code,
      this.password
    ).subscribe({

      next: (response) => {

        if (response.user.role === 'DOCTOR') {
          this.router.navigate(['/doctor-dashboard']);
        }
        else {
          this.router.navigate(['/patient-dashboard']);
        }

      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          'کد ملی یا رمز عبور اشتباه است.';
      }

    });
  }
}