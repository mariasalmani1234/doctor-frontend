import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Treatment } from '../../../../models/treatment.model'; 
import { TreatmentCardComponent }
from '../../../doctor/patient-profile/components/treatment-card/treatment-card.component';


@Component({
  selector: 'app-treatment-list',
  standalone: true,

  imports:[
    TreatmentCardComponent
  ],

  templateUrl:
  './treatment-list.component.html',

  styleUrl:
  './treatment-list.component.css',

  changeDetection:
  ChangeDetectionStrategy.OnPush
})
export class TreatmentListComponent {



  @Input()
  treatments: Treatment[] = [];



  @Input()
  loading = false;




  @Output()
  view = new EventEmitter<Treatment>();


  @Output()
  edit = new EventEmitter<Treatment>();


  @Output()
  delete = new EventEmitter<Treatment>();





  onView(item:Treatment){

    this.view.emit(item);

  }



  onEdit(item:Treatment){

    this.edit.emit(item);

  }



  onDelete(item:Treatment){

    this.delete.emit(item);

  }



}