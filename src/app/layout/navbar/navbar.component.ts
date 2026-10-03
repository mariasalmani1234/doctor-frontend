import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({

  selector: 'app-navbar',

  standalone: true,

  imports: [
    CommonModule,
    RouterLink
  ],

  templateUrl: './navbar.component.html',

  styleUrl: './navbar.component.css'

})
export class NavbarComponent {


  userRole = 'پزشک';


  userName = 'دکتر';


  menuItems = [

    {
      title:'داشبورد',
      link:'/doctor/dashboard'
    },

    {
      title:'بیماران',
      link:'/doctor/patient-search'
    },

    {
      title:'نوبت‌ها',
      link:'/doctor/appointments'
    },

    {
      title:'پیام‌ها',
      link:'/doctor/messages'
    }

  ];

}