import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';
import {Cliente} from './interfaces/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  //private clientesUrl = 'http://appserver.alunos.di.fc.ul.pt:3010/catalog/clientes';  // URL to web api
  private clienteUrl = 'http://appserver.alunos.di.fc.ul.pt:3010/catalog/cliente';  // URL to web api
  private clienteCreateUrl = 'http://appserver.alunos.di.fc.ul.pt:3010/catalog/clientes/create';  // URL to web api

  private clientesUrl = 'http://10.101.151.25:3010/catalog/clientes';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** GET clientes from the server */
  getClientes(): Observable<any> {
    return this.http.get<any>(this.clientesUrl)
      .pipe(
        map(res => res),
        tap(_ => this.log('fetch clientes request sent')),
        catchError(this.handleError<any>('getCliente', []))
      );
  }

  /** GET cliente by id. Return `undefined` when id not found */
  getClienteNo404<Data>(id: string): Observable<any> {
    const url = `${this.clienteUrl}/?id=${id}`;
    return this.http.get<any>(url)
      .pipe(
        map(clientes => clientes[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? `fetched` : `did not find`;
          this.log(`${outcome} cliente id=${id}`);
        }),
        catchError(this.handleError<any>(`getCliente id=${id}`))
      );
  }

  /** GET cliente by id. Will 404 if id not found */
  getCliente(email: string): Observable<any> {
    const url = `${this.clienteUrl}/${email}`;
    console.log('O url no service deu: ' + url);
    return this.http.get<any>(url).pipe(
      map(res => res),
      tap(_ => this.log(`fetch cliente w/ email=${email} request sent`)),
      catchError(this.handleError<any>(`getCliente email=${email}`))
    );
  }

  /** POST: add a new cliente to the server */
  addCliente(cliente: {nome: string, password: string, email: string, morada: string,
    numero_telefone: string, nif: number}): Observable<Cliente> {
    return this.http.post<Cliente>(this.clienteCreateUrl, cliente, this.httpOptions).pipe(
      tap((newCliente: Cliente) => this.log(`add cliente w/ id=${newCliente._id} request sent`)),
      catchError(this.handleError<Cliente>('addCliente'))
    );
  }

  /** POST: update the cliente on the server */
  updateCliente(cliente: Cliente | string): Observable<any> {
    const id = typeof cliente === 'string' ? cliente : cliente._id;
    const url = `${this.clienteUrl}/${id}/update`;

    return this.http.post(url, cliente, this.httpOptions).pipe(
      tap(_ => this.log(`update cliente w/ id=${{id}} request sent`)),
      catchError(this.handleError<any>('updateCliente'))
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

  /** Log a ClienteService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ClienteService: ${message}`);
  }

}
