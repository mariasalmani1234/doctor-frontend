import {
  Component,
  Input
} from '@angular/core';

import { Patient }
from '../../../../../models/patient.model';



@Component({

  selector:'app-patient-info',

  standalone:true,

  imports:[],

  templateUrl:'./patient-info.component.html',

  styleUrl:'./patient-info.component.css'

})
export class PatientInfoComponent {


@Input({required:true})
patient!: Patient;


}