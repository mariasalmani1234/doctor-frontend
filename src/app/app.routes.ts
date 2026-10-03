import { Routes } from '@angular/router';


import { HomeComponent }
from './pages/home/home.component';


import { DoctorsComponent }
from './pages/doctors/doctors.component';


import { LoginComponent }
from './pages/login/login.component';


import { RegisterComponent }
from './pages/register/register.component';



import { PatientDashboardComponent }
from './pages/patient-dashboard/patient-dashboard.component';



import { DoctorLayoutComponent }
from './features/doctor/layout/doctor-layout.component';



import { DoctorDashboardComponent }
from './features/doctor/dashboard/dashboard.component';



import { PatientSearchComponent }
from './features/patient-search/patient-search.component';



import { PatientProfileComponent }
from './features/doctor/patient-profile/patient-profile.component';



import { AppointmentsComponent }
from './pages/appointments/appointments.component';





export const routes: Routes = [



  // صفحات عمومی سایت

  {
    path:'',
    component:HomeComponent
  },


  {
    path:'doctors',
    component:DoctorsComponent
  },


  {
    path:'login',
    component:LoginComponent
  },


  {
    path:'register',
    component:RegisterComponent
  },



  // پنل بیمار

  {
    path:'patient-dashboard',
    component:PatientDashboardComponent
  },





  // پنل پزشک

  {
    path:'doctor',

    component:DoctorLayoutComponent,


    children:[


      {
        path:'',
        redirectTo:'dashboard',
        pathMatch:'full'
      },



      {
        path:'dashboard',

        component:DoctorDashboardComponent

      },



      {
        path:'patient-search',

        component:PatientSearchComponent

      },



      {
        path:'patient/:id',

        component:PatientProfileComponent

      },



      {
        path:'appointments',

        component:AppointmentsComponent

      }



    ]

  },






  // مسیرهای اشتباه

  {
    path:'**',

    redirectTo:''
  }



];