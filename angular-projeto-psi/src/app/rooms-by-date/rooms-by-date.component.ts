import {Component, Input, OnInit} from '@angular/core';

import { Hotel } from '../interfaces/Hotel';
import {HotelService} from '../hotel.service';
import { Quarto } from '../interfaces/Quarto';
import {QuartoService} from '../quarto.service';
import { TipoQuarto } from '../interfaces/TipoQuarto';
import { Reserva } from '../interfaces/Reserva';
import { ReservaService } from '../reserva.service';


import {ActivatedRoute} from '@angular/router';
import {DataService} from "../data.service";

@Component({
  selector: 'app-rooms-by-date',
  templateUrl: './rooms-by-date.component.html',
  styleUrls: ['./rooms-by-date.component.css']
})
export class RoomsByDateComponent implements OnInit {

  @Input() tipo: string;
  @Input() dataInicial: Date;
  @Input() dataFinal: Date;
  hotel: Hotel;
  quartos: Quarto[];
  //allR: Reserva[];
  //reservas: Reserva[];
  show: boolean;

  constructor(private route: ActivatedRoute,
              private hotelService: HotelService,
              //private reservaService: ReservaService,
              private quartoService: QuartoService) { }

  ngOnInit(): void {
    this.getHotel();
    //this.getReservas();
    //this.getReservasDoHotel();
  }

  public getHotel(): void {
    const id = this.route.snapshot.url[0].path;
    this.hotelService.getHotel(id)
      .subscribe(response => {
          this.hotel = response.hotel;
          this.quartos = response.hotel_rooms;
        }
      );
  }

  public getNumRoom(type): any {
    const q = this.quartos.filter(function(quarto) {
      return quarto.tipoQuarto === type;
    });
    return q.length;
  }

  public getTipoCerto(tipo): any {
    return tipo.split(/(?=[A-Z])/).join(' ');
  }

  public getRoom(type): any {
    const q = this.quartos.filter(quarto => quarto.tipoQuarto === type);
    return q[0];
  }

  calculaPreco(): any {
    let di = new Date(this.dataInicial);
    let df = new Date(this.dataFinal);
    const epocaBaixa = [1, 2,3,4,5, 10, 11,12];
    let diasAltos=0;
    let diasBaixos=0;
    let days=0;
    while ( di.getTime() < df.getTime()) {
      if (epocaBaixa.includes(di.getMonth()+1)) {
        if( di.getMonth()+1 === 1) {
          if ( di.getDate() < 15 ) {
            diasAltos++;
          } else {
            diasBaixos++;
          }
        } else if (di.getMonth()+1 === 9) {
          if ( di.getDate() < 30 ) {
            diasAltos++;
          } else {
            diasBaixos++;
          }
        } else if (di.getMonth()+1 === 12) {
          if ( di.getDate() > 15 ) {
            diasAltos++;
          } else {
            diasBaixos++;
          }
        } else {
          diasBaixos++;
        }
      } else {
        diasAltos++;
      }
      di.setDate(di.getDate() + 1);
    }
    const q = this.getRoom(this.tipo);
    return diasAltos*q.precoAlto + diasBaixos*q.precoBaixo ;
  }

}
