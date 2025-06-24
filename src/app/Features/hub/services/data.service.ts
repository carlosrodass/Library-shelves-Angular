import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { BookViewModel } from "../../book/models/book.model";

@Injectable({
    providedIn: 'root'
  })
  export class DataService {
    private dataList = new BehaviorSubject<any[]>([]);
    dataList$ = this.dataList.asObservable();
  
    getElements(): Observable<any[]> {
      return this.dataList.asObservable();
    }

    updateList(newData: BookViewModel[]) {
      this.dataList.next(newData);
    }
  }