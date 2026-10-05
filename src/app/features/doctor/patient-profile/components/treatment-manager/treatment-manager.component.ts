import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';

import {
  Treatment
} from '../../../../../models/treatment.model';

import {
  TreatmentFormComponent
} from '../../../treatments/treatment-form/treatment-form.component';


@Component({
  selector: 'app-treatment-manager',

  standalone: true,

  imports: [
    TreatmentFormComponent
  ],

  templateUrl:
    './treatment-manager.component.html',

  styleUrl:
    './treatment-manager.component.css',

  changeDetection:
    ChangeDetectionStrategy.OnPush
})
export class TreatmentManagerComponent
  implements OnChanges {


  @Input({ required: true })
  patientId!: number;


  @Input()
  treatments: Treatment[] = [];


  @Input()
  loading = false;


  @Input()
  saving = false;


  @Input()
  selectedTreatment:
    Treatment | null = null;


  @Output()
  create =
    new EventEmitter<void>();


  @Output()
  save =
    new EventEmitter<Treatment>();


  @Output()
  cancel =
    new EventEmitter<void>();


  @Output()
  edit =
    new EventEmitter<Treatment>();


  @Output()
  delete =
    new EventEmitter<Treatment>();


  @Output()
  view =
    new EventEmitter<Treatment>();


  currentPage = 1;

  pageSize = 5;

  showForm = false;

  viewMode = false;


  // =========================================================
  // Changes
  // =========================================================

  ngOnChanges(
    changes: SimpleChanges
  ): void {

    if (changes['treatments']) {

      const total =
        this.totalPages;


      if (total === 0) {

        this.currentPage = 1;

      }
      else if (
        this.currentPage > total
      ) {

        this.currentPage = total;

      }

    }

  }


  // =========================================================
  // Pagination
  // =========================================================

  get totalPages(): number {

    if (!this.treatments.length) {

      return 0;

    }

    return Math.ceil(
      this.treatments.length /
      this.pageSize
    );

  }


  get visibleTreatments(): Treatment[] {

    const start =
      (this.currentPage - 1) *
      this.pageSize;


    return this.treatments.slice(
      start,
      start + this.pageSize
    );

  }


  get pages(): number[] {

    return Array.from(
      {
        length: this.totalPages
      },
      (_, index) =>
        index + 1
    );

  }


  changePage(
    page: number
  ): void {

    if (
      page < 1 ||
      page > this.totalPages
    ) {

      return;

    }


    this.currentPage = page;

  }


  previousPage(): void {

    if (
      this.currentPage > 1
    ) {

      this.currentPage--;

    }

  }


  nextPage(): void {

    if (
      this.currentPage <
      this.totalPages
    ) {

      this.currentPage++;

    }

  }


  // =========================================================
  // Create
  // =========================================================

  onCreate(): void {

    this.viewMode = false;

    this.showForm = true;

    this.create.emit();

  }


  // =========================================================
  // View
  // =========================================================

  onView(
    item: Treatment
  ): void {

    this.viewMode = true;

    this.showForm = true;

    this.view.emit(item);

  }


  // =========================================================
  // Edit
  // =========================================================

  onEdit(
    item: Treatment
  ): void {

    this.viewMode = false;

    this.showForm = true;

    this.edit.emit(item);

  }


  // =========================================================
  // Delete
  // =========================================================

  onDelete(
    item: Treatment
  ): void {

    this.delete.emit(item);

  }


  // =========================================================
  // Save
  // =========================================================

  onSave(
    item: Treatment
  ): void {

    this.save.emit(item);

  }


  // =========================================================
  // Cancel
  // =========================================================

  onCancel(): void {

    this.showForm = false;

    this.viewMode = false;

    this.cancel.emit();

  }


  // =========================================================
  // Status
  // =========================================================

  getStatusLabel(
    status: string
  ): string {

    switch (status) {

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


  getStatusClass(
    status: string
  ): string {

    switch (status) {

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


  // =========================================================
  // Tooth
  // =========================================================

  getToothLabel(
    toothNumber:
      number |
      null |
      undefined
  ): string {

    if (
      toothNumber === null ||
      toothNumber === undefined
    ) {

      return 'بدون دندان';

    }


    return `دندان ${toothNumber}`;

  }

}