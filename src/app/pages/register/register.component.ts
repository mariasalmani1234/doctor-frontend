import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  national_code = '';
  first_name = '';
  last_name = '';
  phone = '';
  email = '';
  password = '';
  confirm_password = '';

  errorMessage = '';
  successMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register(): void {

    this.errorMessage = '';
    this.successMessage = '';

    const data = {
      national_code: this.national_code,
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone,
      email: this.email,
      password: this.password,
      confirm_password: this.confirm_password
    };

    this.authService.register(data).subscribe({

      next: () => {

        this.successMessage =
          'ثبت‌نام با موفقیت انجام شد.';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);

      },

      error: (error) => {

        console.error(error);

        this.errorMessage =
          'اطلاعات ثبت‌نام صحیح نیست.';
      }

    });
  }
}