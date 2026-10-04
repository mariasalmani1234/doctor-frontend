import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  RouterModule
} from '@angular/router';


@Component({

  selector: 'app-doctor-sidebar',

  standalone: true,

  imports: [
    CommonModule,
    RouterModule
  ],

  templateUrl:
    './doctor-sidebar.component.html',

  styleUrl:
    './doctor-sidebar.component.css'

})
export class DoctorSidebarComponent {


  @Input()
  open = false;


  @Output()
  closeMenu =
    new EventEmitter<void>();


  menuItems = [

    {
      title: 'داشبورد',
      icon: '🏠',
      link: '/doctor/dashboard'
    },

    {
      title: 'جستجوی بیمار',
      icon: '🔍',
      link: '/doctor/patient-search'
    },

    {
      title: 'پرونده بیماران',
      icon: '🙎‍♂️️',
      link: '/doctor/patients'
    },

    {
      title: 'طرح درمان',
      icon: '📋',
      link: '/doctor/treatments'
    },

    {
      title: 'وضعیت دندان‌ها',
      icon: '🦷',
      link: '/doctor/dental'
    },

    {
      title: 'نوبت‌ها',
      icon: '📅',
      link: '/doctor/appointments'
    },

    {
      title: 'گزارش‌ها',
      icon: '📊',
      link: '/doctor/reports'
    },

    {
      title: 'تنظیمات',
      icon: '⚙️',
      link: '/doctor/settings'
    }

  ];


  onNavigate() {

    this.closeMenu.emit();

  }

}