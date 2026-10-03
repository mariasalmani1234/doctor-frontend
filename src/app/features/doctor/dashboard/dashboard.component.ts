import {
  Component
} from '@angular/core';

import {
  RouterLink
} from '@angular/router';


@Component({
  selector: 'app-doctor-dashboard',

  standalone: true,

  imports: [
    RouterLink
  ],

  templateUrl:
  './dashboard.component.html',

  styleUrl:
  './dashboard.component.css'
})
export class DoctorDashboardComponent {


  todayPatients = 0;

  activeRecords = 0;

  completedTreatments = 0;



}