import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
  inject
} from '@angular/core';


import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';


import {
  Treatment
}
from '../../../../models/treatment.model';


import {
  TreatmentStatus
}
from '../../../../core/enums/treatment-status.enum';



@Component({

  selector:'app-treatment-form',

  standalone:true,

  imports:[
    ReactiveFormsModule
  ],

  templateUrl:'./treatment-form.component.html',

  styleUrl:'./treatment-form.component.css',

  changeDetection:
  ChangeDetectionStrategy.OnPush

})
export class TreatmentFormComponent
implements OnChanges {



private fb = inject(FormBuilder);



@Input({required:true})
patientId!:number;  
    
@Input()
treatment:Treatment|null=null;

@Input()
saving=false;

@Output()
save =new EventEmitter<Treatment>();

@Output()
cancel =new EventEmitter<void>();

readonly TreatmentStatus =TreatmentStatus;

teeth = [

18,17,16,15,14,13,12,11,

21,22,23,24,25,26,27,28,

48,47,46,45,44,43,42,41,

31,32,33,34,35,36,37,38

];



form = this.fb.group({



title:[

'',

[

Validators.required,

Validators.minLength(3)

]

],





diagnosis:[

''

],





toothNumber:[

null as number | null

],





status:[

TreatmentStatus.InProgress,

Validators.required

],





startDate:[

'',

Validators.required

],





endDate:[

''

],





description:[

''

]



});










ngOnChanges(
changes:SimpleChanges
){



if(changes['treatment']){



if(this.treatment){



this.form.patchValue({



title:this.treatment.title,



diagnosis:this.treatment.diagnosis ?? '',



toothNumber:
this.treatment.toothNumber ?? null,



status:this.treatment.status,



startDate:this.treatment.startDate,



endDate:this.treatment.endDate ?? '',



description:
this.treatment.description ?? ''



});



}

else{



this.form.reset({



title:'',



diagnosis:'',



toothNumber:null,



status:
TreatmentStatus.InProgress,



startDate:'',



endDate:'',



description:''



});



}



}



}









submit(){



if(this.form.invalid){


this.form.markAllAsTouched();


return;


}






const value =
this.form.getRawValue();







const result:Treatment={



id:

this.treatment?.id ?? 0,





patientId:

this.patientId,





title:

value.title!,





diagnosis:

value.diagnosis ?? '',





toothNumber:

value.toothNumber ?? undefined,





status:

value.status!,





startDate:

value.startDate!,





endDate:

value.endDate ?? '',





description:

value.description ?? '',





createdAt:

this.treatment?.createdAt ??

new Date().toISOString()



};





this.save.emit(result);




}








onCancel(){


this.cancel.emit();


}








isInvalid(control:string){


const field=this.form.get(control);


return !!(

field &&

field.invalid &&

field.touched

);


}



}