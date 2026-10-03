import {
Component,
EventEmitter,
Output
} from '@angular/core';


@Component({

selector:'app-doctor-header',

standalone:true,

templateUrl:'./doctor-header.component.html',

styleUrl:'./doctor-header.component.css'

})
export class DoctorHeaderComponent {


@Output()
menuClick =
new EventEmitter<void>();


}