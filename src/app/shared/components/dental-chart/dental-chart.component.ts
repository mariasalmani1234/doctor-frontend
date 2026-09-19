import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { DentalTooth, 
  DentalTreatment,
  DentalToothStatus } from '../../../models/dental.model';


@Component({
  selector: 'app-dental-chart',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './dental-chart.component.html',
  styleUrl: './dental-chart.component.css'
})
export class DentalChartComponent {


  upperTeeth: DentalTooth[] = [
    { number: 18, status: 'healthy' },
    { number: 17, status: 'healthy' },
    { number: 16, status: 'healthy' },
    { number: 15, status: 'healthy' },
    { number: 14, status: 'healthy' },
    { number: 13, status: 'healthy' },
    { number: 12, status: 'healthy' },
    { number: 11, status: 'healthy' },

    { number: 21, status: 'healthy' },
    { number: 22, status: 'healthy' },
    { number: 23, status: 'healthy' },
    { number: 24, status: 'healthy' },
    { number: 25, status: 'healthy' },
    { number: 26, status: 'healthy' },
    { number: 27, status: 'healthy' },
    { number: 28, status: 'healthy' }
  ];


  lowerTeeth: DentalTooth[] = [
    { number: 48, status: 'healthy' },
    { number: 47, status: 'healthy' },
    { number: 46, status: 'healthy' },
    { number: 45, status: 'healthy' },
    { number: 44, status: 'healthy' },
    { number: 43, status: 'healthy' },
    { number: 42, status: 'healthy' },
    { number: 41, status: 'healthy' },

    { number: 31, status: 'healthy' },
    { number: 32, status: 'healthy' },
    { number: 33, status: 'healthy' },
    { number: 34, status: 'healthy' },
    { number: 35, status: 'healthy' },
    { number: 36, status: 'healthy' },
    { number: 37, status: 'healthy' },
    { number: 38, status: 'healthy' }
  ];




  treatments: DentalTreatment[] = [];



  selectedTooth: DentalTooth | null = null;

  dialogOpen = false;


  form = {
    service: 'filled' as DentalToothStatus,
    date: '',
    notes: ''
  };


  serviceOptions = [
    {
      value: 'filled' as DentalToothStatus,
      label: 'پرکردگی'
    },
    {
      value: 'root-canal' as DentalToothStatus,
      label: 'عصب‌کشی'
    },
    {
      value: 'crown' as DentalToothStatus,
      label: 'روکش'
    },
    {
      value: 'extracted' as DentalToothStatus,
      label: 'کشیدن'
    },
    {
      value: 'implant' as DentalToothStatus,
      label: 'ایمپلنت'
    }
  ];



  openTreatmentDialog(tooth: DentalTooth): void {

    this.selectedTooth = tooth;

    this.form = {
      service: 'filled',
      date: this.getTodayDate(),
      notes: ''
    };

    this.dialogOpen = true;
  }



  closeDialog(): void {

    this.dialogOpen = false;

    this.selectedTooth = null;
  }


  saveTreatment(): void {

    if (!this.selectedTooth) {
      return;
    }


    const selectedService = this.serviceOptions.find(
      item => item.value === this.form.service
    );


    if (!selectedService) {
      return;
    }


    const newTreatment: DentalTreatment = {

      id: Date.now(),

      toothNumber: this.selectedTooth.number,

      service: selectedService.value,

      serviceLabel: selectedService.label,

      date: this.form.date,

      notes: this.form.notes

    };


    this.treatments.unshift(newTreatment);



    this.selectedTooth.status = selectedService.value;

    this.selectedTooth.lastTreatment =
      selectedService.label;



    this.closeDialog();
  }




  getToothClass(tooth: DentalTooth): string {

    return `tooth ${tooth.status}`;
  }




  getTodayDate(): string {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, '0');

    const day = String(
      today.getDate()
    ).padStart(2, '0');


    return `${year}-${month}-${day}`;
  }



  getStatusLabel(status: string): string {

    switch (status) {

      case 'filled':
        return 'پرکردگی';

      case 'root-canal':
        return 'عصب‌کشی';

      case 'crown':
        return 'روکش';

      case 'extracted':
        return 'کشیده شده';

      case 'implant':
        return 'ایمپلنت';

      default:
        return 'سالم';
    }
  }
}