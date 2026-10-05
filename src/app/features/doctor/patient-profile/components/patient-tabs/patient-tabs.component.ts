import {
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  Treatment
} from '../../../../../models/treatment.model';

import {
  TreatmentManagerComponent
} from '../treatment-manager/treatment-manager.component';

import {
  DentalChartComponent
} from '../../../../../shared/components/dental-chart/dental-chart.component';


import {
  Patient
} from '../../../../../models/patient.model';

import {
  PatientInfoComponent
} from '../patient-info/patient-info.component';


@Component({
  selector: 'app-patient-tabs',

  standalone: true,

  imports: [
    CommonModule,
    TreatmentManagerComponent,
    DentalChartComponent,
  
    PatientInfoComponent
  ],

  templateUrl: './patient-tabs.component.html',

  styleUrl: './patient-tabs.component.css'
})
export class PatientTabsComponent {



  @Input({ required: true })
  patient!: Patient;


  @Input()
  patientId!: number;


  @Input()
  treatments: Treatment[] = [];


  @Input()
  loading = false;


  @Input()
  saving = false;


  @Input()
  selectedTreatment: Treatment | null = null;


  @Output()
  create = new EventEmitter<void>();


  @Output()
  view = new EventEmitter<Treatment>();


  @Output()
  edit = new EventEmitter<Treatment>();


  @Output()
  delete = new EventEmitter<Treatment>();


  @Output()
  save = new EventEmitter<Treatment>();


  @Output()
  cancel = new EventEmitter<void>();

  

  activeTab:
    'treatment' |
    'dental' |
    'info' = 'treatment';



  selectTab(
    tab:
      'treatment' |
      'dental' |
      'info'
  ): void {

    this.activeTab = tab;

  }


 
  onCreate(): void {

    this.create.emit();

  }


  onView(
    item: Treatment
  ): void {

    this.view.emit(item);

  }


  onEdit(
    item: Treatment
  ): void {

    this.edit.emit(item);

  }


  onDelete(
    item: Treatment
  ): void {

    this.delete.emit(item);

  }


  onSave(
    item: Treatment
  ): void {

    this.save.emit(item);

  }


  onCancel(): void {

    this.cancel.emit();

  }

}