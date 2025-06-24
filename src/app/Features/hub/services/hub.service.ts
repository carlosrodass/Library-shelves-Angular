import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
// import { Hub } from '../hub-model/hub.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../enviroments/enviroment';
import {
  HubInViewModel,
  HubUpdateViewModel,
  HubViewModel,
} from '../models/hub.model';
import { BookInViewModel, BookViewModel } from '../../book/models/book.model';

@Injectable({
  providedIn: 'root',
})
export class HubService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getHubs(): Observable<HubViewModel[]> {
    return this.http
      .get<HubViewModel[]>(`${this.apiUrl}/Hub/GetAllHubs`)
      .pipe(
        catchError((error) => {
          console.error('Error getting values', error);
          return throwError(() => new Error('Error editing hub'));
        })
      );
  }

  getHubById(id: number): Observable<HubViewModel> {
    return this.http.get<HubViewModel>(`${this.apiUrl}/hub/ById/${id}`).pipe();
  }

  createHubAsync(hubInViewModel: HubInViewModel): Observable<HubViewModel> {
    return this.http
      .post<HubViewModel>(`${this.apiUrl}/Hub/CreateAsync`, hubInViewModel)
      .pipe();
  }

  deleteHubAsync(hubId: number | string): Observable<boolean> {
    return this.http
      .delete<boolean>(`${this.apiUrl}/Hub/DeleteAsync/${hubId}`)
      .pipe();
  }
  editHubAsync(
    hubUpdateViewModel: HubUpdateViewModel
  ): Observable<HubViewModel> {
    return this.http
      .put<HubViewModel>(`${this.apiUrl}/Hub`, hubUpdateViewModel)
      .pipe(
        catchError((error) => {
          console.error('Error editing hub:', error);
          return throwError(() => new Error('Error editing hub'));
        })
      );
  }

  createBookFromHubAsync(bookInViewModel: BookInViewModel
  ): Observable<BookViewModel> {
    return this.http
      .post<BookViewModel>(`${this.apiUrl}/Hub/CreateBookFromHub`, bookInViewModel)
      .pipe();
  }
}
