import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Patient }
from '../../../../../models/patient.model';



@Component({

  selector: 'app-patient-header',

  standalone: true,

  imports: [],

  templateUrl:
  './patient-header.component.html',

  styleUrl:
  './patient-header.component.css',

  changeDetection:
  ChangeDetectionStrategy.OnPush

})
export class PatientHeaderComponent {



  @Input({ required: true })
  patient!: Patient;



  @Output()
  back = new EventEmitter<void>();




  get fullName(): string {

    return `${this.patient?.firstName ?? ''} ${this.patient?.lastName ?? ''}`.trim();

  }



  getInitials(): string {

    return (

      `${this.patient?.firstName?.charAt(0) ?? ''}` +

      `${this.patient?.lastName?.charAt(0) ?? ''}`

    );

  }





  get age(): number | string {

    if (!this.patient?.birthDate) {

      return '-';

    }


    const birth =
      new Date(this.patient.birthDate);


    const today =
      new Date();


    let age =
      today.getFullYear() -
      birth.getFullYear();


    const month =
      today.getMonth() -
      birth.getMonth();


    if (
      month < 0 ||
      (
        month === 0 &&
        today.getDate() < birth.getDate()
      )
    ) {

      age--;

    }


    return age;

  }





  get genderLabel(): string {

    switch(this.patient?.gender){

      case 'male':
        return 'مرد';


      case 'female':
        return 'مونث';


      default:
        return '-';

    }

  }





  get insuranceName(){

    return this.patient?.insuranceName ?? '-';

  }



  get insuranceNumber(){

    return this.patient?.insuranceNumber ?? '-';

  }



  get insuranceStatus(){

    return this.patient?.insuranceStatus ?? '-';

  }



  get serviceStatus(){

    return this.patient?.serviceStatus ?? '-';

  }



  get coverageType(){

    return this.patient?.coverageType ?? '-';

  }



  get veteranStatus(){

    return this.patient?.veteranStatus ?? '-';

  }



  get relation(){

    return this.patient?.relation ?? '-';

  }



  get educationLevel(){

    return this.patient?.educationLevel ?? '-';

  }
  get nationalCode(): string {

  return this.patient?.nationalCode ?? '-';

 }



  get specialDisease(){

    return this.patient?.specialDisease ?? 'فاقد بیماری';

  }





  onBack(): void {

    this.back.emit();

  }


}