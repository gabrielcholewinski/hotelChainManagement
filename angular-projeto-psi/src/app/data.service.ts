import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

import { Hotel } from './interfaces/Hotel';
import { Quarto } from './interfaces/Quarto';
import { TipoQuarto } from './interfaces/TipoQuarto';



@Injectable({
  providedIn: 'root'
})
export class DataService {
  //type
  private messageSource = new BehaviorSubject<number>(0);
  currentDays = this.messageSource.asObservable();


  constructor() { }

  changeHotelId(n: number) {
    this.messageSource.next(n);
  }
}
