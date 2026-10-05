import {
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';


import {
  Patient
} from '../../../models/patient.model';


import {
  Treatment
} from '../../../models/treatment.model';


import {
  PatientHeaderComponent
} from './components/patient-header/patient-header.component';


import {
  PatientTabsComponent
} from './components/patient-tabs/patient-tabs.component';



@Component({

  selector:'app-patient-profile',

  standalone:true,

  imports:[

    PatientHeaderComponent,

    PatientTabsComponent

  ],

  templateUrl:
  './patient-profile.component.html',

  styleUrl:
  './patient-profile.component.css'

})
export class PatientProfileComponent
implements OnInit {



patient!: Patient;


treatments: Treatment[] = [];

selectedTreatment:
Treatment | null = null;


loadingPatient = false;

loadingTreatments = false;

savingTreatment = false;

errorMessage = '';



constructor(
 private router:Router,
 private route:ActivatedRoute
){}





ngOnInit():void{


this.loadMockPatient();


this.loadMockTreatments();


}





loadMockPatient(){


this.patient = {


id:1,

userId:3,


firstName:'ماریا',

lastName:'سلمانی',


nationalCode:'0110409443',


phone:'09123456789',


birthDate:'1382-12-19',


gender:'زن',


address:'تهران',


insuranceNumber:'INS-554433',


insuranceStatus:'فعال',


serviceStatus:'عادی',


coverageType:'اصلی',


veteranStatus:'ندارد',


relation:' سرپرست',


educationLevel:'لیسانس',


specialDisease:'فاقد بیماری'


};


}





loadMockTreatments(){


this.treatments=[


{

id:1,

patientId:1,

title:'عصب کشی دندان',

diagnosis:'پوسیدگی شدید دندان',

toothNumber:16,

status:'in_progress' as any,

startDate:'1405/01/10',

endDate:'',

description:'جلسه اول درمان'

},


{

id:2,

patientId:1,

title:'جرم گیری',

diagnosis:'جرم دندان',

toothNumber:null,

status:'completed' as any,

startDate:'1404/12/20',

endDate:'1404/12/25',

description:'درمان کامل شد'

},


{

id:3,

patientId:1,

title:'ترمیم دندان',

diagnosis:'شکستگی دندان',

toothNumber:24,

status:'incomplete' as any,

startDate:'1405/02/01',

endDate:'',

description:'نیاز به بررسی'

}


];


}





backToSearch(){

this.router.navigate([

'/doctor/patient-search'

]);


}





openCreateForm(){

this.selectedTreatment=null;

}





viewTreatment(
item:Treatment
){

this.selectedTreatment=item;

}





editTreatment(
item:Treatment
){

this.selectedTreatment=item;

}





deleteTreatment(
item:Treatment
){

console.log(
'delete',
item
);

}





saveTreatment(
item:Treatment
){

console.log(
'save',
item
);

}





closeForm(){

this.selectedTreatment=null;

}



}