import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  //private hotelsUrl = 'http://appserver.alunos.di.fc.ul.pt:3010/catalog/hoteis';  // URL to web api
 // private hotelUrl = 'http://appserver.alunos.di.fc.ul.pt:3010/catalog/hotel';  // URL to web api
  private hotelsUrl = 'http://10.101.151.25:3010/catalog/hoteis';
  private hotelUrl = 'http://10.101.151.25:3010/catalog/hotel';
  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET hotels from the server */
  getHotels(): Observable<any> {
    return this.http.get<any>(this.hotelsUrl)
      .pipe(
        map(res => res),
        tap(_ => this.log('fetch hotels request sent')),
        catchError(this.handleError<any>('getHotels', []))
      );
  }

  /** GET hotel by id. Return `undefined` when id not found */
  getHotelNo404<Data>(id: string): Observable<any> {
    const url = `${this.hotelUrl}/?id=${id}`;
    return this.http.get<any>(url)
      .pipe(
        map(hotels => hotels[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} hotel id=${id}`);
        }),
        catchError(this.handleError<any>(`getHotel id=${id}`))
      );
  }

  /** GET hotel by id. Will 404 if id not found */
  getHotel(id: string): Observable<any> {
    const url = `${this.hotelUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      map(res => res),
      tap(_ => this.log(`fetch hotel w/ id=${id} request sent`)),
      catchError(this.handleError<any>(`getHotel id=${id}`))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a BookService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`QuartoService: ${message}`);
  }
}
