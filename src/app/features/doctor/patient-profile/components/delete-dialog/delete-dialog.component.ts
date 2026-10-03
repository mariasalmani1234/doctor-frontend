import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { Treatment } from '../../../../../models/treatment.model';


@Component({
  selector: 'app-delete-dialog',
  standalone: true,
  imports: [],
  templateUrl: './delete-dialog.component.html',
  styleUrl: './delete-dialog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeleteDialogComponent {


  @Input({ required: true })
  treatment!: Treatment;


  @Input()
  loading = false;


  @Output()
  confirm = new EventEmitter<void>();


  @Output()
  cancel = new EventEmitter<void>();



  onConfirm(): void {

    this.confirm.emit();

  }


  onCancel(): void {

    if(this.loading){
      return;
    }

    this.cancel.emit();

  }

}