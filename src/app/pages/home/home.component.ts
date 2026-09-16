import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorService } from '../../core/services/doctor.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  doctors: Doctor[] = [];
  loading = true;
  errorMessage = '';

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;
      },

      error: (error) => {
        console.error('Doctor API Error:', error);
        this.errorMessage = 'خطا در دریافت اطلاعات پزشکان';
        this.loading = false;
      }
    });
  }
}