import {
  Component,
  inject
} from '@angular/core';

import {
  FormControl,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  Router
} from '@angular/router';

import {
  finalize
} from 'rxjs';

import {
  PatientService
} from '../../core/services/patient.service';

@Component({
  selector: 'app-patient-search',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './patient-search.component.html',
  styleUrl: './patient-search.component.css'
})
export class PatientSearchComponent {

  private readonly patientService =
    inject(PatientService);

  private readonly router =
    inject(Router);

  nationalCodeControl =
    new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^\d{10}$/)
      ]
    });

  loading = false;

  errorMessage = '';

  searchPatient(): void {

    this.errorMessage = '';

    if (this.nationalCodeControl.invalid) {

      this.nationalCodeControl.markAsTouched();

      return;
    }

    const nationalCode =
      this.nationalCodeControl.value?.trim();

    this.loading = true;

    this.patientService
      .getByNationalCode(nationalCode)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (patient:any) => {

          if (!patient) {

            this.errorMessage =
              'بیماری با این کد ملی یافت نشد.';

            return;
          }

          this.router.navigate([
            '/doctor/patient',
            patient.id
          ]);
        },

        error: (error:any) => {

          console.error(
            'Patient search error:',
            error
          );

          this.errorMessage =
            'در ارتباط با سرور خطایی رخ داد. لطفاً دوباره تلاش کنید.';
        }
      });
  }

  clearSearch(): void {

    this.nationalCodeControl.reset();

    this.errorMessage = '';
  }
}