import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DoctorService } from '../../core/services/doctor.service';
import { Doctor } from '../../models/doctor.model';

@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {

  doctors: Doctor[] = [];

  search = '';
  city = '';
  specialty = '';

  loading = false;

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.loading = true;

    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
        this.loading = false;
      },
      error: (error) => {
        console.error(error);
        this.loading = false;
      }
    });
  }

  searchDoctors(): void {

    this.loading = true;

    if (this.search.trim()) {

      this.doctorService.searchDoctors(this.search).subscribe({
        next: (data) => {
          this.doctors = data;
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
        }
      });

      return;
    }

    if (this.city.trim()) {

      this.doctorService.getDoctorsByCity(this.city).subscribe({
        next: (data) => {
          this.doctors = data;
          this.loading = false;
        },
        error: (error) => {
          console.error(error);
          this.loading = false;
        }
      });

      return;
    }

    this.loadDoctors();
  }

  clearFilters(): void {
    this.search = '';
    this.city = '';
    this.specialty = '';

    this.loadDoctors();
  }
}