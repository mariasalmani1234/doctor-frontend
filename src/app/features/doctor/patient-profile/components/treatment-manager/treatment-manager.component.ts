import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Treatment } from '../../../../../models/treatment.model';

import { TreatmentListComponent }
from '../../../treatments/treatment-list/treatment-list.component';

import { TreatmentFormComponent }
from '../../../treatments/treatment-form/treatment-form.component';


@Component({

  selector:'app-treatment-manager',

  standalone:true,

  imports:[
    TreatmentListComponent,
    TreatmentFormComponent
  ],

  templateUrl:'./treatment-manager.component.html',

  styleUrl:'./treatment-manager.component.css',

  changeDetection:ChangeDetectionStrategy.OnPush

})
export class TreatmentManagerComponent {



@Input({required:true})
patientId!:number;



@Input()
treatments:Treatment[]=[];



@Input()
loading=false;



@Input()
saving=false;



@Input()
selectedTreatment:Treatment|null=null;





@Output()
create=new EventEmitter<void>();


@Output()
save=new EventEmitter<Treatment>();


@Output()
cancel=new EventEmitter<void>();


@Output()
edit=new EventEmitter<Treatment>();


@Output()
delete=new EventEmitter<Treatment>();


@Output()
view=new EventEmitter<Treatment>();





currentPage=1;


pageSize=5;





get totalPages():number{

return Math.ceil(
this.treatments.length / this.pageSize
);

}





get visibleTreatments():Treatment[]{


const start =
(this.currentPage-1)*this.pageSize;


return this.treatments.slice(
start,
start+this.pageSize
);


}






get pages():number[]{


return Array.from(
{length:this.totalPages},
(_,index)=>index+1
);


}





changePage(page:number){

this.currentPage=page;

}





getStatusLabel(status:string):string{


switch(status){


case 'in_progress':

return 'در حال انجام';



case 'completed':

return 'تکمیل شده';



case 'cancelled':

return 'لغو شده';



case 'incomplete':

return 'نیاز به بررسی';



default:

return '-';


}


}






getStatusClass(status:string):string{


switch(status){


case 'in_progress':

return 'progress';



case 'completed':

return 'completed';



case 'cancelled':

return 'cancelled';



case 'incomplete':

return 'review';



default:

return '';

}


}



}