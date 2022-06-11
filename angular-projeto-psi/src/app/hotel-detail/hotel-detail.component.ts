import {Component, Input, OnChanges, OnInit} from '@angular/core';

import {Hotel} from '../interfaces/Hotel';
import {HotelService} from '../hotel.service';
import {Quarto} from '../interfaces/Quarto';
import {QuartoService} from '../quarto.service';
import {TipoQuarto} from '../interfaces/TipoQuarto';

import {Location} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

import {DataService} from '../data.service';

import {Reserva} from '../interfaces/Reserva';
import {ReservaService} from '../reserva.service';


@Component({
  selector: 'app-hotel-detail',
  templateUrl: './hotel-detail.component.html',
  styleUrls: ['./hotel-detail.component.css']
})
export class HotelDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private data: DataService,
              private hotelService: HotelService,
              private quartoService: QuartoService,
              private location: Location,
              private reservaService: ReservaService) { }

  @Input() hotel: Hotel;
  @Input() quartos: Quarto[];
  @Input() servicos: string[];
  show: boolean;
  precoMinimo = 0;
  precoMaximo = 0;
  botaoR: boolean;
  dataInicial: Date;
  dataFinal: Date;
  reservas: Reserva[];
  id: string;
  myStorage = window.localStorage;
  tipo: string;
  esconderDatas: boolean;


  ngOnInit(): void {
    this.getHotel();
    //this.getReservasDoHotel();
    this.show = false;
    this.botaoR = false;
    this.esconderDatas = true;
  }

  public getHotel(): void {
    this.route.params.subscribe((routeParams) => {
      this.id = routeParams.hotelID;
      this.hotelService
        .getHotel(this.id)
        .subscribe(
          (response) => {
            this.hotel = response.hotel;
            this.quartos = response.hotel_rooms;
            this.reservaService.getReservas().subscribe(response => this.reservas = response.reservas_list);
          }
        );
    });
  }

  private getReservasDoHotel(): void {
    this.reservaService.getReservas().subscribe(response => this.reservas = response.reservas_list);
  }

  public lowestPrice(): any {
    let price = 1000000;
    // const rooms=getRoom(type);
    for (const quarto of this.quartos) {
      if (quarto.precoBaixo < price) {
        price = quarto.precoBaixo;
      }
    }
    return price;
  }

  public numeroQuartos(): any {
    return this.quartos.length;
  }

  public getRoomTypes(): any {
    const v: Array<TipoQuarto> = [];
    if (this.precoMinimo < this.precoMaximo) {
      for (const quarto of this.quartos) {
        if (!v.includes(quarto.tipoQuarto)
          && ( ((this.precoMinimo <= quarto.precoBaixo) && (quarto.precoBaixo <= this.precoMaximo))
            || ((this.precoMinimo <= quarto.precoAlto) && (quarto.precoAlto <= this.precoMaximo)))) {
          v.push(quarto.tipoQuarto);
        }
      }
    } else {
      for (const quarto of this.quartos) {
        if (!v.includes(quarto.tipoQuarto)) {
          v.push(quarto.tipoQuarto);
        }
      }
    }
    return v;
  }

  public getRoomTypesByDate(): any {
    //console.log('Entrou no roomTypesByDate');
    const t: TipoQuarto[] = [];
    const di = new Date(this.dataInicial);
    const df = new Date(this.dataFinal);
    const da = new Date();
    const dat = new Date(da.getTime() - (1000 * 60 * 60 * da.getHours()));

    //console.log(dat);
    if (di < df && (di >= dat)) {
      this.mostraBotao();
      //console.log('Vai mostrar os quartos');
      for (const quarto of this.quartos) {
        const q = this.reservas.filter(reserva => reserva.quarto.toString()  === quarto._id);
        //console.log('Reservas para o tipo de quarto ' + quarto + ':' + q);
        if (q.length === 0 && !t.includes(quarto.tipoQuarto)) {
          //console.log('Deu push');
          console.log('O tipo de quarto ' + quarto.tipoQuarto + ' deu push no primeiro');
          t.push(quarto.tipoQuarto);
        } else {
          if ( !this.checkOverlap(q, di, df) && !t.includes(quarto.tipoQuarto)) {
            console.log('O tipo de quarto ' + quarto.tipoQuarto + ' deu push no segundo');
            t.push(quarto.tipoQuarto);
          }
        }
      }
    } else {
      this.botaoR = false;
    }
    return t;
  }

  private checkOverlap(quarto: Reserva[], di: Date, df: Date): boolean {
    let overlap = false;
    for (const reserva of quarto) {
      const ri = new Date(reserva.checkin);
      const rf = new Date(reserva.checkout);
      if ( ((di <= rf) && (df >= ri))) {
        overlap = true;
      }
    }
    return overlap;
  }

  public mostraBotao(): void {
    this.botaoR = true;
  }

  public mostraReserva(): void {
    if (this.myStorage.length === 0) {
      window.alert('Tem de fazer login ou registar-se primeiro');
    } else {
      if(this.tipo) {
        this.show = true;
        this.esconderDatas = false;
      } else{
        window.alert('Tem de selecionar um tipo de quarto');
      }
    }
  }

}
