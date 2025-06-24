import { Component, Inject } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HubViewModel } from '../../../Features/hub/models/hub.model';

@Component({
  selector: 'app-dialog-content',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './dialog-content.component.html',
  styleUrl: './dialog-content.component.scss',
})
export class DialogContentComponent {
  dialogTitle!: string;
  isFromEdit!: boolean;
  hubToEditViewModel!: HubViewModel;
  bookForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      dialogTitle: string;
      isFromEdit: boolean;
      hubToEditViewModel: HubViewModel;
    }
  ) {
    this.bookForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      image: ['', Validators.required],
      statusId: [1, Validators.required],
    });


    this.dialogTitle = data.dialogTitle;
    this.isFromEdit = data.isFromEdit;
    this.hubToEditViewModel = data.hubToEditViewModel || {};
  }

  onSubmit(): void {    
    if (this.hubToEditViewModel == null || this.hubToEditViewModel == undefined) {

      console.log("Error jeje");
    }else{
      this.dialogRef.close(this.hubToEditViewModel);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
