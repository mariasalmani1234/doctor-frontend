import {
  Component,
  Input
} from '@angular/core';

import {
  Patient
} from '../../../../../models/patient.model';


@Component({

selector:'app-patient-info-card',

standalone:true,

imports:[],

templateUrl:'./patient-info-card.component.html',

styleUrl:'./patient-info-card.component.css'

})
export class PatientInfoCardComponent {


@Input({required:true})
patient!:Patient;


}