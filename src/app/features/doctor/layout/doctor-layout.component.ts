import {
  Component
} from '@angular/core';


import {
  RouterOutlet
} from '@angular/router';


import {
  DoctorHeaderComponent
} from './doctor-header/doctor-header.component';


import { DoctorSidebarComponent } from './doctor-sidebar/doctor-sidebar.component';



@Component({

selector:'app-doctor-layout',

standalone:true,


imports:[

RouterOutlet,

DoctorHeaderComponent,

DoctorSidebarComponent

],


templateUrl:'./doctor-layout.component.html',


styleUrl:'./doctor-layout.component.css'


})
export class DoctorLayoutComponent {



menuOpen=false;




toggleMenu(){

this.menuOpen=!this.menuOpen;

}




closeMenu(){

this.menuOpen=false;

}



}