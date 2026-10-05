import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';

import {
  AppointmentService
} from '../../../core/services/appointment.service';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DoctorDashboardComponent implements OnInit {

  private appointmentService =
    inject(AppointmentService);

  todayPatients = 0;

  activeRecords = 0;

  pendingTreatments = 0;

  loading = false;

  errorMessage = '';

  ngOnInit(): void {

    console.log('DOCTOR DASHBOARD LOADED');

    this.loadDashboardStats();

  }

  loadDashboardStats(): void {

    console.log(
      'CALLING DASHBOARD API...'
    );

    this.loading = true;

    this.appointmentService
      .getDoctorDashboardStats()
      .subscribe({

        next: (stats) => {

          console.log(
            'DASHBOARD API RESPONSE:',
            stats
          );

          this.todayPatients =
            Number(stats.todayPatients);

          this.activeRecords =
            Number(stats.activeRecords);

          this.pendingTreatments =
            Number(stats.pendingTreatments);

          console.log(
            'VALUES:',
            this.todayPatients,
            this.activeRecords,
            this.pendingTreatments
          );

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'DASHBOARD API ERROR:',
            error
          );

          this.errorMessage =
            'دریافت اطلاعات داشبورد با خطا مواجه شد.';

          this.loading = false;

        }

      });

  }

}