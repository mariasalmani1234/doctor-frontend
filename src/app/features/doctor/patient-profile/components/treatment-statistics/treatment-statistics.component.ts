import {
  ChangeDetectionStrategy,
  Component,
  Input
} from '@angular/core';

import { Treatment }
from '../../../../../models/treatment.model';

import { TreatmentStatus }
from '../../../../../core/enums/treatment-status.enum';


@Component({
  selector: 'app-treatment-statistics',
  standalone: true,
  imports: [],
  templateUrl:
  './treatment-statistics.component.html',

  styleUrl:
  './treatment-statistics.component.css',

  changeDetection:
  ChangeDetectionStrategy.OnPush
})
export class TreatmentStatisticsComponent {


  @Input({ required: true })
  treatments: Treatment[] = [];



  readonly TreatmentStatus = TreatmentStatus;



  get totalCount(): number {

    return this.treatments.length;

  }



  get completedCount(): number {

    return this.treatments.filter(

      item =>
      item.status === TreatmentStatus.Completed

    ).length;

  }



  get inProgressCount(): number {

    return this.treatments.filter(

      item =>
      item.status === TreatmentStatus.InProgress

    ).length;

  }



  get incompleteCount(): number {

    return this.treatments.filter(

      item =>
      item.status === TreatmentStatus.Incomplete

    ).length;

  }



  get cancelledCount(): number {

    return this.treatments.filter(

      item =>
      item.status === TreatmentStatus.Cancelled

    ).length;

  }


}