import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../enviroments/enviroment";
import { Observable } from "rxjs";
import { BookViewModel } from "../models/book.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root',
})
export class BookService{
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient){}


      getAllBooks(): Observable<BookViewModel[]> {
        return this.http
          .get<BookViewModel[]>(`${this.apiUrl}/Book/`)
          .pipe();
      }
}