import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class QuartoService {

  // private quartosUrl = 'http://http://10.101.151.25:3010/catalog/hoteis';  // URL to web api

  //private quartoUrl = 'http://appserver.alunos.di.fc.ul.pt:3010/catalog/quarto';  // URL to web api
  private quartoUrl = 'http://10.101.151.25:3010/catalog/quarto';

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };


  /** GET quartos from the server */
  /*
  getQuartos(): Observable<any> {
    return this.http.get<any>(this.quartosUrl)
      .pipe(
        map(res => res),
        tap(_ => this.log('fetch quartos request sent')),
        catchError(this.handleError<any>('getQuartos', []))
      );
  }*/

  /** GET quarto by id. Return `undefined` when id not found */
  getQuartoNo404<Data>(id: string): Observable<any> {
    const url = `${this.quartoUrl}/?id=${id}`;
    return this.http.get<any>(url)
      .pipe(
        map(quartos => quartos[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} quarto id=${id}`);
        }),
        catchError(this.handleError<any>(`getQuarto id=${id}`))
      );
  }

  /** GET quarto by id. Will 404 if id not found */
  getQuarto(id: string): Observable<any> {
    const url = `${this.quartoUrl}/${id}`;
    return this.http.get<any>(url).pipe(
      tap(_ => this.log(`fetch quarto w/ id=${id} request sent`)),
      catchError(this.handleError<any>(`getQuarto id=${id}`))
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
