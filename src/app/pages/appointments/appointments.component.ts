import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Appointment,
  AppointmentStatus
} from '../../models/appointment.model';

import {
  AppointmentService
} from '../../core/services/appointment.service';

import {
  AuthService
} from '../../core/services/auth.service';


@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent implements OnInit {

  private appointmentService =
    inject(AppointmentService);

  private authService =
    inject(AuthService);


  appointments: Appointment[] = [];

  loading = false;

  actionLoading = false;

  errorMessage = '';

  successMessage = '';

  isDoctor = false;

  isPatient = false;


  ngOnInit(): void {

    const user =
      this.authService.getCurrentUser();

    this.isDoctor =
      user?.role === 'DOCTOR';

    this.isPatient =
      user?.role === 'PATIENT';

    this.loadAppointments();

  }


  loadAppointments(): void {

    this.loading = true;

    this.errorMessage = '';

    this.appointmentService
      .getAll()
      .subscribe({

        next: (data) => {

          this.appointments = data;

          this.loading = false;

        },

        error: (error) => {

          console.error(
            'Appointments loading error',
            error
          );

          this.errorMessage =
            'دریافت نوبت‌ها با خطا مواجه شد.';

          this.loading = false;

        }

      });

  }


  confirmAppointment(
    appointment: Appointment
  ): void {

    this.updateStatus(
      appointment,
      'CONFIRMED'
    );

  }


  completeAppointment(
    appointment: Appointment
  ): void {

    this.updateStatus(
      appointment,
      'COMPLETED'
    );

  }


  cancelAppointment(
    appointment: Appointment
  ): void {

    this.updateStatus(
      appointment,
      'CANCELLED'
    );

  }


  private updateStatus(
    appointment: Appointment,
    status: AppointmentStatus
  ): void {

    if (this.actionLoading) {

      return;

    }

    this.actionLoading = true;

    this.errorMessage = '';

    this.successMessage = '';

    this.appointmentService
      .updateStatus(
        appointment.id,
        status
      )
      .subscribe({

        next: (updated) => {

          const index =
            this.appointments.findIndex(
              item =>
                item.id === updated.id
            );

          if (index !== -1) {

            this.appointments[index] =
              updated;

          }

          this.successMessage =
            this.getSuccessMessage(status);

          this.actionLoading = false;

        },

        error: (error) => {

          console.error(
            'Appointment status update error',
            error
          );

          this.errorMessage =
            this.getErrorMessage(
              error
            );

          this.actionLoading = false;

        }

      });

  }


  getStatusLabel(
    status: AppointmentStatus
  ): string {

    switch (status) {

      case 'PENDING':

        return 'در انتظار تایید';

      case 'CONFIRMED':

        return 'تایید شده';

      case 'COMPLETED':

        return 'انجام شده';

      case 'CANCELLED':

        return 'لغو شده';

      default:

        return status;

    }

  }


  getStatusClass(
    status: AppointmentStatus
  ): string {

    switch (status) {

      case 'PENDING':

        return 'pending';

      case 'CONFIRMED':

        return 'confirmed';

      case 'COMPLETED':

        return 'completed';

      case 'CANCELLED':

        return 'cancelled';

      default:

        return '';

    }

  }


  getSuccessMessage(
    status: AppointmentStatus
  ): string {

    switch (status) {

      case 'CONFIRMED':

        return 'نوبت با موفقیت تایید شد.';

      case 'COMPLETED':

        return 'نوبت با موفقیت تکمیل شد.';

      case 'CANCELLED':

        return 'نوبت با موفقیت لغو شد.';

      default:

        return 'عملیات با موفقیت انجام شد.';

    }

  }


  getErrorMessage(
    error: any
  ): string {

    if (
      error?.error?.status
    ) {

      if (
        Array.isArray(
          error.error.status
        )
      ) {

        return error.error.status[0];

      }

      return error.error.status;

    }

    if (
      error?.error?.detail
    ) {

      return error.error.detail;

    }

    if (
      error?.error?.time
    ) {

      if (
        Array.isArray(
          error.error.time
        )
      ) {

        return error.error.time[0];

      }

      return error.error.time;

    }

    return 'عملیات با خطا مواجه شد.';

  }


  canConfirm(
    appointment: Appointment
  ): boolean {

    return (
      this.isDoctor &&
      appointment.status === 'PENDING'
    );

  }


  canComplete(
    appointment: Appointment
  ): boolean {

    return (
      this.isDoctor &&
      appointment.status === 'CONFIRMED'
    );

  }


  canCancel(
    appointment: Appointment
  ): boolean {

    if (
      appointment.status === 'COMPLETED' ||
      appointment.status === 'CANCELLED'
    ) {

      return false;

    }

    return (
      this.isDoctor ||
      this.isPatient
    );

  }


  formatDate(
    date: string
  ): string {

    if (!date) {

      return '-';

    }

    const parts =
      date.split('-');

    if (parts.length !== 3) {

      return date;

    }

    return (
      `${parts[2]}/${parts[1]}/${parts[0]}`
    );

  }


  formatTime(
    time: string
  ): string {

    if (!time) {

      return '-';

    }

    return time.substring(
      0,
      5
    );

  }

}