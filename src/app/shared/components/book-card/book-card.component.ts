import { Component, Input } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { BookViewModel } from '../../../Features/book/models/book.model';

@Component({
  selector: 'app-book-card',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './book-card.component.html',
  styleUrl: './book-card.component.scss',
})
export class BookCardComponent {
  defaultImage!: string;
  imageTwo!: string;
  @Input() book!: BookViewModel;

  constructor() {}

  ngOnInit() {
    this.defaultImage =
      'https://static.vecteezy.com/system/resources/thumbnails/044/280/984/small_2x/stack-of-books-on-a-brown-background-concept-for-world-book-day-photo.jpg';

    if (this.book.image == null || this.book.image == undefined) {
      this.book.image = this.defaultImage;
    }
  }
}
