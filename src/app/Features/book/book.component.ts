import { Component } from '@angular/core';
import { BookService } from './services/book.service';
import { BookViewModel } from './models/book.model';
import { SharedModule } from '../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from '../../shared/components/book-card/book-card.component';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [ CommonModule, SharedModule, BookCardComponent],
  templateUrl: './book.component.html',
  styleUrl: './book.component.scss'
})
export class BookComponent {

  books : Array<BookViewModel> = [];
  constructor(private _bookService: BookService){}

  ngOnInit(){
    this.loadBooks();  
  }


  loadBooks(){
    this._bookService.getAllBooks().subscribe((data) => {
      this.books = data;  
    })
  }


}
