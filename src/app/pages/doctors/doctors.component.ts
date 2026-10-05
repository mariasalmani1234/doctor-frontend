import {
  Component,
  OnInit,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  DoctorService
} from '../../core/services/doctor.service';

import {
  AppointmentService,
  DoctorSchedule
} from '../../core/services/appointment.service';

import {
  AuthService
} from '../../core/services/auth.service';

import {
  Doctor
} from '../../models/doctor.model';

import {
  Appointment
} from '../../models/appointment.model';


@Component({
  selector: 'app-doctors',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './doctors.component.html',
  styleUrl: './doctors.component.css'
})
export class DoctorsComponent implements OnInit {

  private doctorService =
    inject(DoctorService);

  private appointmentService =
    inject(AppointmentService);

  private authService =
    inject(AuthService);


  doctors: Doctor[] = [];

  search = '';

  city = '';

  specialty = '';

  loading = false;


  bookingDoctor: Doctor | null = null;

  selectedDate = '';

  selectedTime = '';

  availableTimes: string[] = [];

  schedules: DoctorSchedule[] = [];

  bookingError = '';

  bookingSuccess = '';

  bookingLoading = false;

  patientId: number | null = null;


  ngOnInit(): void {

    const user =
      this.authService.getCurrentUser();

    if (
      user &&
      user.role === 'PATIENT'
    ) {

      this.patientId = user.id;

    }

    this.loadDoctors();

  }


  loadDoctors(): void {

    this.loading = true;

    this.doctorService
      .getDoctors()
      .subscribe({

        next: data => {

          this.doctors = data;

          this.loading = false;

        },

        error: error => {

          console.error(error);

          this.loading = false;

        }

      });

  }


  searchDoctors(): void {

    this.loading = true;

    if (this.search.trim()) {

      this.doctorService
        .searchDoctors(
          this.search.trim()
        )
        .subscribe({

          next: data => {

            this.doctors = data;

            this.loading = false;

          },

          error: error => {

            console.error(error);

            this.loading = false;

          }

        });

      return;

    }


    if (this.city.trim()) {

      this.doctorService
        .getDoctorsByCity(
          this.city.trim()
        )
        .subscribe({

          next: data => {

            this.doctors = data;

            this.loading = false;

          },

          error: error => {

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


  openBooking(
    doctor: Doctor
  ): void {

    this.bookingDoctor = doctor;

    this.selectedDate = '';

    this.selectedTime = '';

    this.availableTimes = [];

    this.schedules = [];

    this.bookingError = '';

    this.bookingSuccess = '';

    this.bookingLoading = false;

    if (!this.patientId) {

      this.bookingError =
        'برای دریافت نوبت باید به عنوان بیمار وارد شوید.';

    }

  }


  closeBooking(): void {

    this.bookingDoctor = null;

    this.selectedDate = '';

    this.selectedTime = '';

    this.availableTimes = [];

    this.schedules = [];

    this.bookingError = '';

    this.bookingSuccess = '';

    this.bookingLoading = false;

  }


  getMinDate(): string {

    return new Date()
      .toISOString()
      .substring(0, 10);

  }


onDateChange(): void {

  this.selectedTime = '';
  this.availableTimes = [];
  this.bookingError = '';
  this.bookingSuccess = '';

  if (
    !this.bookingDoctor ||
    !this.selectedDate
  ) {
    return;
  }

  this.appointmentService
    .getSchedulesByDoctorId(
      this.bookingDoctor.id,
      this.selectedDate
    )
    .subscribe({

      next: schedules => {

        this.schedules = schedules;

        if (
          !this.schedules.length
        ) {

          this.availableTimes = [];

          this.bookingError =
            'پزشک در این روز برنامه کاری ندارد.';

          return;
        }

        this.loadBookedTimes();

      },

      error: error => {

        console.error(
          'Schedule error:',
          error
        );

        this.bookingError =
          'برنامه کاری پزشک دریافت نشد.';

      }

    });

}

  private loadBookedTimes(): void {

  if (
    !this.bookingDoctor ||
    !this.selectedDate
  ) {
    return;
  }

  this.appointmentService
    .getBookedTimes(
      this.bookingDoctor.id,
      this.selectedDate
    )
    .subscribe({

      next: response => {

        const bookedTimes =
          response.times.map(
            time =>
              this.normalizeTime(time)
          );

        this.availableTimes =
          this.buildAvailableTimes(
            this.schedules,
            bookedTimes
          );

      },

      error: error => {

        console.error(
          'Booked times error:',
          error
        );

        this.bookingError =
          'ساعت‌های رزروشده دریافت نشد.';

      }

    });

}


private buildAvailableTimes(
  schedules: DoctorSchedule[],
  bookedTimes: string[]
): string[] {

  const result = new Set<string>();

  for (
    const schedule of schedules
  ) {

    const start =
      this.timeToMinutes(
        schedule.startTime
      );

    const end =
      this.timeToMinutes(
        schedule.endTime
      );

    for (
      let minutes = start;
      minutes < end;
      minutes += 30
    ) {

      const time =
        this.minutesToTime(
          minutes
        );

      if (
        !bookedTimes.includes(time)
      ) {

        result.add(time);

      }

    }

  }

  return Array.from(result).sort(
    (a, b) =>
      this.timeToMinutes(a) -
      this.timeToMinutes(b)
  );

}


  private timeToMinutes(
    time: string
  ): number {

    const parts =
      time
        .substring(0, 5)
        .split(':')
        .map(Number);

    return (
      parts[0] * 60 +
      parts[1]
    );

  }


  private minutesToTime(
    minutes: number
  ): string {

    const hours =
      Math.floor(
        minutes / 60
      );

    const mins =
      minutes % 60;


    return (
      `${hours
        .toString()
        .padStart(2, '0')}:` +
      `${mins
        .toString()
        .padStart(2, '0')}`
    );

  }


  private normalizeTime(
    time: string
  ): string {

    return time.substring(
      0,
      5
    );

  }


  bookAppointment(): void {

    this.bookingError = '';

    this.bookingSuccess = '';


    if (!this.bookingDoctor) {

      return;

    }


    if (!this.patientId) {

      this.bookingError =
        'برای دریافت نوبت باید به عنوان بیمار وارد شوید.';

      return;

    }


    if (!this.selectedDate) {

      this.bookingError =
        'لطفاً تاریخ نوبت را انتخاب کنید.';

      return;

    }


    if (!this.selectedTime) {

      this.bookingError =
        'لطفاً ساعت نوبت را انتخاب کنید.';

      return;

    }


    this.bookingLoading = true;


    this.appointmentService
      .create({

        doctorId:
          this.bookingDoctor.id,

        date:
          this.selectedDate,

        time:
          this.selectedTime

      })
      .subscribe({

        next: appointment => {

          this.bookingLoading = false;

          this.bookingSuccess =
            'نوبت شما با موفقیت ثبت شد.';

          this.availableTimes =
            this.availableTimes.filter(
              time =>
                time !==
                this.selectedTime
            );

          this.selectedTime = '';

        },

        error: error => {

          console.error(
            'Appointment booking error',
            error
          );

          this.bookingLoading = false;

          this.bookingError =
            this.getBookingError(
              error
            );

        }

      });

  }


  private getBookingError(
    error: any
  ): string {

    if (
      error?.error?.doctorId
    ) {

      return this.getErrorValue(
        error.error.doctorId
      );

    }


    if (
      error?.error?.date
    ) {

      return this.getErrorValue(
        error.error.date
      );

    }


    if (
      error?.error?.time
    ) {

      return this.getErrorValue(
        error.error.time
      );

    }


    if (
      error?.error?.detail
    ) {

      return this.getErrorValue(
        error.error.detail
      );

    }


    return 'ثبت نوبت با خطا مواجه شد.';

  }


  private getErrorValue(
    value: any
  ): string {

    if (Array.isArray(value)) {

      return value[0] ?? 'خطای نامشخص';

    }

    return String(
      value
    );

  }

}