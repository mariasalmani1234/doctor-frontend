import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PatientDashboardComponent } from './pages/patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './pages/doctor-dashboard/doctor-dashboard.component';


export const routes: Routes = [

  {
    path: '',
    component: HomeComponent
  },

  {
    path: 'doctors',
    component: DoctorsComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'register',
    component: RegisterComponent
  },

  {
    path: 'patient-dashboard',
    component: PatientDashboardComponent
  },

  {
    path: 'doctor-dashboard',
    component: DoctorDashboardComponent
  }

];