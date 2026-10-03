import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Treatment } from '../../../../../models/treatment.model';

import { TreatmentStatus } from '../../../../../core/enums/treatment-status.enum';



@Component({
  selector: 'app-treatment-card',

  standalone:true,

  imports:[],

  templateUrl:
  './treatment-card.component.html',

  styleUrl:
  './treatment-card.component.css',

  changeDetection:
  ChangeDetectionStrategy.OnPush
})
export class TreatmentCardComponent {


  @Input({required:true})
  treatment!: Treatment;



  @Output()
  view =
  new EventEmitter<Treatment>();


  @Output()
  edit =
  new EventEmitter<Treatment>();


  @Output()
  delete =
  new EventEmitter<Treatment>();



  readonly TreatmentStatus =
  TreatmentStatus;





  getStatusLabel(
    status: TreatmentStatus
  ): string {


    switch(status){


      case TreatmentStatus.Completed:

        return 'تکمیل شده';



      case TreatmentStatus.InProgress:

        return 'در حال انجام';



      case TreatmentStatus.Incomplete:

        return 'ناقص';



      case TreatmentStatus.Cancelled:

        return 'لغو شده';



      default:

        return 'نامشخص';

    }

  }





  getStatusClass(
    status: TreatmentStatus
  ): string {


    switch(status){


      case TreatmentStatus.Completed:

        return 'status-completed';



      case TreatmentStatus.InProgress:

        return 'status-progress';



      case TreatmentStatus.Incomplete:

        return 'status-incomplete';



      case TreatmentStatus.Cancelled:

        return 'status-cancelled';



      default:

        return '';

    }

  }





  onView():void {

    this.view.emit(
      this.treatment
    );

  }



  onEdit():void {

    this.edit.emit(
      this.treatment
    );

  }



  onDelete():void {

    this.delete.emit(
      this.treatment
    );

  }



}