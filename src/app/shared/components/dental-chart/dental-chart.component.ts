import {
  Component,
  Input,
  OnInit,
  inject
} from '@angular/core';

import { TreatmentStatus } from '../../../core/enums/treatment-status.enum';
import {
  CommonModule
} from '@angular/common';


import {
  FormsModule
} from '@angular/forms';



import {
  DentalTooth,
  DentalToothStatus
} from '../../../models/dental.model';



import {
  Treatment
} from '../../../models/treatment.model';



import {
  TreatmentService
} from '../../../core/services/treatment.service';



interface ToothPoint {

  number:number;

  top:string;

  left:string;

}





@Component({

selector:'app-dental-chart',

standalone:true,


imports:[

CommonModule,

FormsModule

],



templateUrl:'./dental-chart.component.html',



styleUrl:'./dental-chart.component.css'


})
export class DentalChartComponent implements OnInit {



private treatmentService =
inject(TreatmentService);




@Input({required:true})
patientId!:number;






teeth:ToothPoint[]=[


{number:18, top:'39%', left:'35%'},

{number:17, top:'32%', left:'35%'},

{number:16, top:'26%', left:'36%'},

{number:15, top:'21%', left:'38%'},

{number:14, top:'17%', left:'40%'},

{number:13, top:'14%', left:'42%'},

{number:12, top:'12%', left:'44%'},

{number:11, top:'11%', left:'47%'},



{number:21, top:'11%', left:'50%'},

{number:22, top:'11%', left:'53%'},

{number:23, top:'13%', left:'55%'},

{number:24, top:'16%', left:'57%'},

{number:25, top:'20%', left:'59%'},

{number:26, top:'25%', left:'60%'},

{number:27, top:'32%', left:'61%'},

{number:28, top:'39%', left:'61%'},




{number:48, top:'61%', left:'35%'},

{number:47, top:'68%', left:'35%'},

{number:46, top:'74%', left:'36%'},

{number:45, top:'80%', left:'38%'},

{number:44, top:'84%', left:'40%'},

{number:43, top:'86%', left:'42%'},

{number:42, top:'87%', left:'44%'},

{number:41, top:'88%', left:'47%'},




{number:31, top:'90%', left:'49%'},

{number:32, top:'89%', left:'52%'},

{number:33, top:'88%', left:'55%'},

{number:34, top:'84%', left:'57%'},

{number:35, top:'80%', left:'59%'},

{number:36, top:'75%', left:'60%'},

{number:37, top:'67%', left:'61%'},

{number:38, top:'61%', left:'61%'}


];







treatments:Treatment[]=[];



selectedTooth:DentalTooth|null=null;


selectedTreatment:Treatment|null=null;



dialogOpen=false;

showAddForm=false;



form:{

title:string;

diagnosis:string;

status:TreatmentStatus;

date:string;

description:string;

}={


title:'',

diagnosis:'',

status:TreatmentStatus.InProgress,

date:'',

description:''


};





ngOnInit(){


this.loadTreatments();


}






loadTreatments(){


if(!this.patientId){

return;

}



this.treatmentService

.getByPatientId(this.patientId)

.subscribe({


next:data=>{


this.treatments=data;


},


error:error=>{


console.error(

'Treatment loading error',

error

);


}


});


}







getToothStatus(toothNumber:number):DentalToothStatus{


const treatment=this.treatments.find(

item=>

item.toothNumber===toothNumber

);



if(!treatment){

return 'healthy';

}





const title=treatment.title.toLowerCase();





if(

title.includes('عصب') ||

title.includes('ریشه')

){

return 'root-canal';

}





if(

title.includes('روکش') ||

title.includes('پروتز')

){

return 'crown';

}





if(

title.includes('ترمیم') ||

title.includes('پرکردگی')

){

return 'filled';

}





if(

title.includes('ایمپلنت')

){

return 'implant';

}





return 'healthy';


}
getToothPointClass(toothNumber:number){

return `tooth-point ${this.getToothStatus(toothNumber)}`;

}







openTreatmentDialog(tooth:ToothPoint){


if(!tooth){

return;

}



this.selectedTooth={


number:tooth.number,


status:this.getToothStatus(tooth.number)


};



this.selectedTreatment=null;


this.showAddForm=false;


this.dialogOpen=true;


}

openAddTreatment(){

this.showAddForm=true;


this.form={


title:'',


diagnosis:'',


status:TreatmentStatus.InProgress,


date:this.getTodayDate(),


description:''


};


}








closeDialog(){


this.dialogOpen=false;


this.selectedTooth=null;


this.selectedTreatment=null;

this.showAddForm=false;
}









getSelectedToothTreatments(){


if(!this.selectedTooth){

return [];

}



return this.treatments.filter(

item=>

item.toothNumber===this.selectedTooth!.number

);


}









getSelectedToothStatusLabel(){


if(!this.selectedTooth){

return 'سالم';

}



switch(

this.getToothStatus(

this.selectedTooth.number

)

){


case 'root-canal':

return 'عصب‌کشی';



case 'filled':

return 'ترمیم / پرکردگی';



case 'crown':

return 'روکش';



case 'implant':

return 'ایمپلنت';



default:

return 'سالم';


}


}









editTreatment(item:Treatment){



this.selectedTreatment=item;



this.form={


title:item.title,


diagnosis:item.diagnosis ?? '',


status:item.status,


date:item.startDate ?? '',


description:item.description ?? ''


};



}









cancelEdit(){


this.selectedTreatment=null;



this.form={


title:'',


diagnosis:'',


status:TreatmentStatus.InProgress,


date:this.getTodayDate(),


description:''


};


}









saveTreatment(){



if(!this.selectedTooth){

return;

}





const data = {


patientId:this.patientId,


title:this.form.title,


diagnosis:this.form.diagnosis,


toothNumber:this.selectedTooth.number,


status:this.form.status as any,


startDate:this.form.date,


description:this.form.description


};







if(this.selectedTreatment){



this.treatmentService

.update(

this.selectedTreatment.id,

data

)

.subscribe({


next:updated=>{


if(updated){


const index=

this.treatments.findIndex(

x=>

x.id===updated.id

);



if(index!==-1){

this.treatments[index]=updated;

}


}



this.closeDialog();


},



error:error=>{


console.error(

'Update treatment error',

error

);


}


});



}

else{



this.treatmentService

.create(data)

.subscribe({


next:created=>{


this.treatments.unshift(created);


this.closeDialog();


},



error:error=>{


console.error(

'Create treatment error',

error

);


}



});


}



}









deleteTreatment(item:Treatment){



this.treatmentService

.delete(item.id)

.subscribe({


next:success=>{


if(success){


this.treatments=

this.treatments.filter(

x=>

x.id!==item.id

);


}


},



error:error=>{


console.error(

'Delete treatment error',

error

);


}


});



}









get dentalSummary(){



const result={


healthy:32,


filled:0,


rootCanal:0,


crown:0,


implant:0


};





this.treatments.forEach(item=>{



if(!item.toothNumber){

return;

}





const status=

this.getToothStatus(

item.toothNumber

);






switch(status){



case 'filled':

result.filled++;

break;



case 'root-canal':

result.rootCanal++;

break;



case 'crown':

result.crown++;

break;



case 'implant':

result.implant++;

break;



}



});







result.healthy=

32 -

(

result.filled+

result.rootCanal+

result.crown+

result.implant

);





return result;


}









get recentTreatments(){


return this.treatments.slice(0,5);


}









getTodayDate(){


return new Date()

.toISOString()

.substring(0,10);


}







getStatusLabel(status:string){


switch(status){



case 'in_progress':

return 'در حال انجام';



case 'completed':

return 'تکمیل شده';



case 'incomplete':

return 'نیاز به بررسی';



case 'cancelled':

return 'لغو شده';



default:

return '-';


}


}


}