import { Component, viewChild, ViewChild } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, NgForm } from '@angular/forms';
import { BookViewModel } from '../../../Features/book/models/book.model';

@Component({
  selector: 'add-book-dialog',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './add-book-dialog.component.html',
  styleUrl: './add-book-dialog.component.scss',
})
export class addBookDialogComponent {
  // @ViewChild('bookForm') bookForm!: NgForm;

  bookForm = viewChild<NgForm>('bookForm');

  book = {
    bookId: '',
    title: '',
    authorName: '',
    isbn: '',
    price: 0,
    releaseDate: '',
    image: '',
    order: 0,
    statusId: 0
  };
  
  constructor(
    private dialogRef: MatDialogRef<addBookDialogComponent>
  ) {}

  ngOnInit() {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {

    console.log(this.book);
    this.dialogRef.close(this.book);
    // const form = this.bookForm();

    // if (form?.invalid) {
    //   console.log('Not valid');
    // }else{
    //   console.log('Form submitted:', form?.value);
      
    // }
  }
}
