import {
  ChangeDetectorRef,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HubService } from '../../services/hub.service';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { SharedModule } from '../../../../shared/shared.module';
import {
  BookInViewModel,
  BookViewModel,
} from '../../../book/models/book.model';
import { MatDialog } from '@angular/material/dialog';
import { HubViewModel } from '../../models/hub.model';
import { addBookDialogComponent } from '../../../../shared/components/add-book-dialog/add-book-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DynamicTableComponent } from '../../../../shared/components/dynamic-table/dynamic-table.component';
import { MatTable } from '@angular/material/table';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-hub-details',
  standalone: true,
  imports: [SharedModule, DynamicTableComponent],
  templateUrl: './hub-details.component.html',
  styleUrl: './hub-details.component.scss',
})
export class HubDetailsComponent implements OnInit {
  private destroy$ = new Subject<void>();
  hubId!: string | number;
  hubDetails: HubViewModel | undefined = undefined;
  books: BookViewModel[] = [];
  previousBooks: any[] = [];
  actionEdit: string = "Edit";
  actionDelete: string = "Delete";

  columnNames: string[] = [
    'title',
    'authorName',
    'releaseDate',
    'price',
    'isbn',
  ];

  actions = [
    {
      label: this.actionEdit,
      callback: (action: any, row: any) => this.executedAction(action, row),
    },
    {
      label: this.actionDelete,
      callback: (action: any, row: any) => this.executedAction(action, row),
    },
  ];
  rowsData: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private hubService: HubService,
    private router: Router,
    private dialog: MatDialog,
    private matSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {

    this.route.paramMap
      .pipe(
        switchMap((params) => {
          const id = params.get('id');
          this.hubId = id !== null ? Number(id) : 0;
          return this.hubService.getHubById(this.hubId);
        })
      )
      .subscribe({
        next: (data) => {
          console.log(data);
          console.log(data.books);
          this.hubDetails = data;
          this.books = data.books || [];
          this.books = [...this.books];
        },
        error: (error) => {
          console.error('Error al obtener los detalles del Hub:', error);
        },
      });

  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  addBook() {
    const dialogRef = this.dialog.open(addBookDialogComponent, {
      width: '28%',
      height: '90%',
    });

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        if (result === undefined || result === null) {
          return;
        }
        if (!result) {
          this.matSnackBar.open(
            'Failed to Add new Book to this Hub.',
            'Error',
            { duration: 3000 }
          );
          return;
        }
        this.addNewBookToThisHub(result);
      });
  }

  addExistingBook() {}

  addNewBookToThisHub(result: any) {
    const newBook: BookInViewModel = {
      ...result,
      title: result.title,
      authorName: result.authorName,
      isbn: result.isbn,
      price: result.price,
      releaseDate: result.releaseDate,
      image: result.image,
      order: result.order,
      statusId: result.statusId,
      hubId: this.hubId! as number,
    };

    this.hubService
      .createBookFromHubAsync(newBook)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        console.log('New Book Created:', data);
        if (data) {
          this.books = [...this.books, data];
          this.matSnackBar.open('Book added successfully', 'Close', {
            duration: 3000,
          });
        } else {
          this.matSnackBar.open(
            'Failed to Add new Book to this Hub.',
            'Error',
            { duration: 3000 }
          );
        }
      });
  }

  openEditDialog(bookId: string | number) {}

  executedAction(action: any, row: any): void {
    
    if (action.label === this.actionEdit) {
      this.editRow(row);
    } else if (action.label === this.actionDelete) {
      this.deleteRow(row);
    }
  }

  editRow(row: any): void {
    console.log('editing:', row);
  }

  deleteRow(row: any): void {
    console.log('Deleting:', row);
  }
}
