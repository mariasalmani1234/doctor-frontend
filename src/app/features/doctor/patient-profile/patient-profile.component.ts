import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import { PatientService } 
from '../../../core/services/patient.service';

import { TreatmentService }
from '../../../core/services/treatment.service';

import { Patient }
from '../../../models/patient.model';

import { Treatment }
from '../../../models/treatment.model';


import { PatientHeaderComponent }
from './components/patient-header/patient-header.component';

import { TreatmentStatisticsComponent }
from './components/treatment-statistics/treatment-statistics.component';

import { TreatmentManagerComponent }
from './components/treatment-manager/treatment-manager.component';

import { DeleteDialogComponent }
from './components/delete-dialog/delete-dialog.component';

import { DentalChartComponent } 
from '../../../shared/components/dental-chart/dental-chart.component';

import { PatientTabsComponent }
from './components/patient-tabs/patient-tabs.component';

@Component({
  selector: 'app-patient-profile',
  standalone: true,

  imports: [
    PatientHeaderComponent,
    TreatmentStatisticsComponent,
    TreatmentManagerComponent,
    DeleteDialogComponent,
    DentalChartComponent,
    PatientTabsComponent,

  ],

  templateUrl: './patient-profile.component.html',
  styleUrl: './patient-profile.component.css',

  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientProfileComponent implements OnInit {


  private route = inject(ActivatedRoute);

  private router = inject(Router);

  private patientService = inject(PatientService);

  private treatmentService = inject(TreatmentService);

  private cdr = inject(ChangeDetectorRef);



  patient: Patient | null = null;

  treatments: Treatment[] = [];

  selectedTreatment: Treatment | null = null;


  loadingPatient = true;

  loadingTreatments = true;

  savingTreatment = false;

  errorMessage = '';

  showDeleteModal = false;

  treatmentToDelete: Treatment | null = null;

  deleting = false;


  ngOnInit(): void {

    this.loadPatient();

  }


  private loadPatient(): void {


    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if(!id){

      this.backToSearch();

      return;

    }



    this.patientService
    .getById(id)
    .subscribe({

      next:(patient)=>{


        this.patient = patient;

        this.loadingPatient = false;



        if(patient){

          this.loadTreatments(patient.id);

        }
        else{

          this.errorMessage =
          'بیمار پیدا نشد.';

        }



        this.cdr.markForCheck();

      },


      error:()=>{


        this.loadingPatient=false;

        this.errorMessage=
        'خطا در دریافت اطلاعات بیمار.';


        this.cdr.markForCheck();

      }


    });


  }





  private loadTreatments(patientId:number):void{


    this.loadingTreatments=true;


    this.treatmentService
    .getByPatientId(patientId)
    .subscribe({

      next:(data)=>{


        this.treatments=data;

        this.loadingTreatments=false;

        this.cdr.markForCheck();


      },


      error:()=>{


        this.loadingTreatments=false;

        this.cdr.markForCheck();


      }


    });


  }





  openCreateForm():void{

    this.selectedTreatment=null;

  }





  openEditForm(item:Treatment):void{


    this.selectedTreatment={
      ...item
    };


  }





  viewTreatment(item:Treatment):void{


    this.selectedTreatment={
      ...item
    };


  }





  saveTreatment(item:Treatment):void{


    if(!this.patient){

      return;

    }



    this.savingTreatment=true;



    if(this.selectedTreatment){


      this.treatmentService
      .update(
        this.selectedTreatment.id,
        item
      )
      .subscribe({

        next:(updated)=>{


          if(updated){


            this.treatments =
            this.treatments.map(t=>

              t.id===updated.id
              ? updated
              : t

            );

          }


          this.finishSave();


        },

        error:()=>this.finishSave()

      });



    }
    else{


      this.treatmentService
      .create(item)
      .subscribe({

        next:(created)=>{


          this.treatments=[
            created,
            ...this.treatments
          ];


          this.finishSave();


        },


        error:()=>this.finishSave()

      });


    }



  }





  private finishSave():void{

  this.savingTreatment = false;

  this.selectedTreatment = null;

  if(this.patient){

    this.loadTreatments(
      this.patient.id
    );

  }

  this.cdr.markForCheck();

}






  openDeleteModal(item:Treatment):void{


    this.treatmentToDelete=item;

    this.showDeleteModal=true;


  }





  closeDeleteModal():void{


    if(this.deleting){

      return;

    }


    this.showDeleteModal=false;

    this.treatmentToDelete=null;


  }





  confirmDelete():void{


    if(!this.treatmentToDelete){

      return;

    }



    this.deleting=true;



    this.treatmentService
    .delete(
      this.treatmentToDelete.id
    )
    .subscribe({

      next:(success)=>{

        if(success && this.patient){
        
          this.loadTreatments(
            this.patient.id
          );
        
     


        }


        this.deleting=false;

        this.closeDeleteModal();

        this.cdr.markForCheck();


      },


      error:()=>{


        this.deleting=false;

        this.cdr.markForCheck();


      }


    });


  }





  backToSearch():void{


    this.router.navigate([
      '/patient-search'
    ]);


  }
  closeForm(): void {

  this.selectedTreatment = null;

 }



}