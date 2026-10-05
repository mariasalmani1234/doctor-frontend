import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  inject
} from '@angular/core';

import {
  CommonModule
} from '@angular/common';

import {
  FormsModule
} from '@angular/forms';

import {
  TreatmentStatus
} from '../../../core/enums/treatment-status.enum';

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

  number: number;

  top: string;

  left: string;

}


@Component({

  selector: 'app-dental-chart',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl: './dental-chart.component.html',

  styleUrl: './dental-chart.component.css'

})
export class DentalChartComponent implements OnChanges, OnInit  {

  
  private treatmentService =
    inject(TreatmentService);


  @Input({
    required: true
  })
  patientId!: number;

  
  teeth: ToothPoint[] = [

    { number: 18, top: '39%', left: '35%' },
    { number: 17, top: '32%', left: '35%' },
    { number: 16, top: '26%', left: '36%' },
    { number: 15, top: '21%', left: '38%' },
    { number: 14, top: '17%', left: '40%' },
    { number: 13, top: '14%', left: '42%' },
    { number: 12, top: '12%', left: '44%' },
    { number: 11, top: '11%', left: '47%' },

    { number: 21, top: '11%', left: '50%' },
    { number: 22, top: '11%', left: '53%' },
    { number: 23, top: '13%', left: '55%' },
    { number: 24, top: '16%', left: '57%' },
    { number: 25, top: '20%', left: '59%' },
    { number: 26, top: '25%', left: '60%' },
    { number: 27, top: '32%', left: '61%' },
    { number: 28, top: '39%', left: '61%' },

    { number: 48, top: '61%', left: '35%' },
    { number: 47, top: '68%', left: '35%' },
    { number: 46, top: '74%', left: '36%' },
    { number: 45, top: '80%', left: '38%' },
    { number: 44, top: '84%', left: '40%' },
    { number: 43, top: '86%', left: '42%' },
    { number: 42, top: '87%', left: '44%' },
    { number: 41, top: '88%', left: '47%' },

    { number: 31, top: '90%', left: '49%' },
    { number: 32, top: '89%', left: '52%' },
    { number: 33, top: '88%', left: '55%' },
    { number: 34, top: '84%', left: '57%' },
    { number: 35, top: '80%', left: '59%' },
    { number: 36, top: '75%', left: '60%' },
    { number: 37, top: '67%', left: '61%' },
    { number: 38, top: '61%', left: '61%' }

  ];



  treatments: Treatment[] = [];


  selectedTooth: DentalTooth | null = null;


  selectedTreatment: Treatment | null = null;


  dialogOpen = false;


  showAddForm = false;


  loading = false;


  saving = false;


  deleting = false;


  errorMessage = '';


  form: {

    title: string;

    diagnosis: string;

    status: TreatmentStatus;

    date: string;

    description: string;

  } = {

    title: '',

    diagnosis: '',

    status: TreatmentStatus.InProgress,

    date: '',

    description: ''

  };


  ngOnInit(): void {

  this.loadTreatments();

}

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (
      changes['patientId'] &&
      this.patientId
    ) {

      this.closeDialog();

      this.loadTreatments();

    }

  }


loadTreatments(): void {


this.treatments = [

  {
  id:1,
  patientId:this.patientId,
  title:'عصب کشی دندان',
  diagnosis:'پوسیدگی عمیق',
  toothNumber:16,
  status:TreatmentStatus.InProgress,
  startDate:'1405/01/10',
  description:'جلسه اول'
  },
  
  
  {
  id:2,
  patientId:this.patientId,
  title:'ترمیم دندان',
  diagnosis:'شکستگی',
  toothNumber:24,
  status:TreatmentStatus.Completed,
  startDate:'1405/01/15',
  description:'ترمیم کامپوزیت'
  },
  
  
  {
  id:3,
  patientId:this.patientId,
  title:'روکش دندان',
  diagnosis:'ضعف ساختار دندان',
  toothNumber:36,
  status:TreatmentStatus.InProgress,
  startDate:'1405/01/20',
  description:'آماده سازی روکش'
  }
  
  ];
 console.log(
  'MOCK TREATMENTS:',
  this.treatments
);

}



  getToothStatus(
    toothNumber: number
  ): DentalToothStatus {

    const treatment =
      this.treatments.find(
        item =>
          item.toothNumber === toothNumber
      );


    if (!treatment) {

      return 'healthy';

    }


    const title =
      (
        treatment.title ??
        ''
      ).toLowerCase();


    const diagnosis =
      (
        treatment.diagnosis ??
        ''
      ).toLowerCase();


    const text =
      `${title} ${diagnosis}`;


    if (
      text.includes('عصب') ||
      text.includes('ریشه') ||
      text.includes('root') ||
      text.includes('canal')
    ) {

      return 'root-canal';

    }


    if (
      text.includes('روکش') ||
      text.includes('پروتز') ||
      text.includes('crown')
    ) {

      return 'crown';

    }


    if (
      text.includes('ترمیم') ||
      text.includes('پرکردگی') ||
      text.includes('پر کردن') ||
      text.includes('کامپوزیت') ||
      text.includes('fill')
    ) {

      return 'filled';

    }


    if (
      text.includes('ایمپلنت') ||
      text.includes('implant')
    ) {

      return 'implant';

    }


    if (
      text.includes('کشیدن') ||
      text.includes('کشیده') ||
      text.includes('extracted')
    ) {

      return 'extracted';

    }


    return 'healthy';

  }


  getToothPointClass(
    toothNumber: number
  ): string {

    return [
      'tooth-point',
      this.getToothStatus(toothNumber)
    ].join(' ');

  }


 
  openTreatmentDialog(
    tooth: ToothPoint
  ): void {

    if (!tooth) {

      return;

    }


    this.selectedTooth = {

      number: tooth.number,

      status:
        this.getToothStatus(
          tooth.number
        )

    };


    this.selectedTreatment = null;

    this.showAddForm = false;

    this.errorMessage = '';

    this.dialogOpen = true;

  }



  openAddTreatment(): void {

    if (!this.selectedTooth) {

      return;

    }


    this.selectedTreatment = null;

    this.showAddForm = true;

    this.errorMessage = '';


    this.form = {

      title: '',

      diagnosis: '',

      status:
        TreatmentStatus.InProgress,

      date:
        this.getTodayDate(),

      description: ''

    };

  }


  

  closeDialog(): void {

    this.dialogOpen = false;

    this.selectedTooth = null;

    this.selectedTreatment = null;

    this.showAddForm = false;

    this.saving = false;

    this.deleting = false;

    this.errorMessage = '';

  }




  getSelectedToothTreatments():
    Treatment[] {

    if (!this.selectedTooth) {

      return [];

    }


    return this.treatments.filter(
      item =>
        item.toothNumber ===
        this.selectedTooth!.number
    );

  }



  getSelectedToothStatusLabel():
    string {

    if (!this.selectedTooth) {

      return 'سالم';

    }


    switch (
      this.getToothStatus(
        this.selectedTooth.number
      )
    ) {

      case 'root-canal':

        return 'عصب‌کشی';


      case 'filled':

        return 'ترمیم / پرکردگی';


      case 'crown':

        return 'روکش';


      case 'implant':

        return 'ایمپلنت';


      case 'extracted':

        return 'کشیده‌شده';


      default:

        return 'سالم';

    }

  }


 

  editTreatment(
    item: Treatment
  ): void {

    this.selectedTreatment = item;

    this.showAddForm = true;

    this.errorMessage = '';


    this.form = {

      title:
        item.title ?? '',

      diagnosis:
        item.diagnosis ?? '',

      status:
        item.status,

      date:
        item.startDate ?? '',

      description:
        item.description ?? ''

    };

  }


  cancelEdit(): void {

    this.selectedTreatment = null;

    this.showAddForm = false;

    this.errorMessage = '';


    this.form = {

      title: '',

      diagnosis: '',

      status:
        TreatmentStatus.InProgress,

      date:
        this.getTodayDate(),

      description: ''

    };

  }



  saveTreatment(): void {

    if (!this.selectedTooth) {

      return;

    }


    if (
      !this.form.title.trim()
    ) {

      this.errorMessage =
        'عنوان درمان را وارد کنید.';

      return;

    }


    if (!this.form.date) {

      this.errorMessage =
        'تاریخ شروع درمان را وارد کنید.';

      return;

    }


    this.saving = true;

    this.errorMessage = '';


    const data = {

      patientId:
        this.patientId,

      title:
        this.form.title.trim(),

      diagnosis:
        this.form.diagnosis.trim(),

      toothNumber:
        this.selectedTooth.number,

      status:
        this.form.status,

      startDate:
        this.form.date,

      description:
        this.form.description.trim(),

      endDate:
        null

    };


    if (this.selectedTreatment) {

      this.treatmentService
        .update(
          this.selectedTreatment.id,
          data
        )
        .subscribe({

          next: updated => {

            const index =
              this.treatments.findIndex(
                x =>
                  x.id ===
                  updated.id
              );


            if (index !== -1) {

              this.treatments[index] =
                updated;

            }


            this.saving = false;

            this.showAddForm = false;

            this.selectedTreatment =
              null;

          },

          error: error => {

            console.error(
              'Update treatment error:',
              error
            );

            this.saving = false;

            this.errorMessage =
              'ویرایش درمان انجام نشد.';

          }

        });


      return;

    }


    this.treatmentService
      .create(data)
      .subscribe({

        next: created => {

          this.treatments = [
            created,
            ...this.treatments
          ];


          this.saving = false;

          this.showAddForm = false;

          this.form = {

            title: '',

            diagnosis: '',

            status:
              TreatmentStatus.InProgress,

            date:
              this.getTodayDate(),

            description: ''

          };

        },

        error: error => {

          console.error(
            'Create treatment error:',
            error
          );

          this.saving = false;

          this.errorMessage =
            'ثبت درمان انجام نشد.';

        }

      });

  }


  deleteTreatment(
    item: Treatment
  ): void {

    if (!item?.id) {

      return;

    }


    this.deleting = true;

    this.errorMessage = '';


    this.treatmentService
      .delete(item.id)
      .subscribe({

        next: () => {

          this.treatments =
            this.treatments.filter(
              x =>
                x.id !== item.id
            );


          if (
            this.selectedTreatment?.id ===
            item.id
          ) {

            this.selectedTreatment =
              null;

            this.showAddForm =
              false;

          }


          this.deleting = false;

        },

        error: error => {

          console.error(
            'Delete treatment error:',
            error
          );

          this.deleting = false;

          this.errorMessage =
            'حذف درمان انجام نشد.';

        }

      });

  }



  get dentalSummary() {

    const result = {

      healthy: 32,

      filled: 0,

      rootCanal: 0,

      crown: 0,

      implant: 0,

      extracted: 0

    };



    const toothStatuses =
      new Map<
        number,
        DentalToothStatus
      >();


    this.treatments.forEach(
      item => {

        if (
          !item.toothNumber
        ) {

          return;

        }


        toothStatuses.set(

          item.toothNumber,

          this.getToothStatus(
            item.toothNumber
          )

        );

      }
    );


    toothStatuses.forEach(
      status => {

        switch (status) {

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


          case 'extracted':

            result.extracted++;

            break;

        }

      }
    );


    result.healthy =
      32 -
      (
        result.filled +
        result.rootCanal +
        result.crown +
        result.implant +
        result.extracted
      );


    return result;

  }




  get recentTreatments():
    Treatment[] {

    return this.treatments
      .slice(0, 5);

  }



  getTodayDate(): string {

    const now =
      new Date();

    const year =
      now.getFullYear();

    const month =
      String(
        now.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        now.getDate()
      ).padStart(2, '0');


    return `${year}-${month}-${day}`;

  }


 

  getStatusLabel(
    status: string
  ): string {

    switch (status) {

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

  getToothTreatment(
  toothNumber:number
): Treatment | undefined {

  return this.treatments.find(
    item =>
      item.toothNumber === toothNumber
  );

}

}