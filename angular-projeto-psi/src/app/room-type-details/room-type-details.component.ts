import { Component, OnInit , Input} from '@angular/core';

import { Hotel } from '../interfaces/Hotel';
import {HotelService} from '../hotel.service';
import { Quarto } from '../interfaces/Quarto';

import {ActivatedRoute} from '@angular/router';
import {TipoQuarto} from '../interfaces/TipoQuarto';


@Component({
  selector: 'app-room-type-details',
  templateUrl: './room-type-details.component.html',
  styleUrls: ['./room-type-details.component.css']
})
export class RoomTypeDetailsComponent implements OnInit {

  // obter quartos para fazer contagens
  @Input() tipo: string;
  hotel: Hotel;
  quartos: Quarto[];
  show: boolean;
  id: string;

  constructor(private route: ActivatedRoute, private hotelService: HotelService) { }

  ngOnInit(): void {
      this.getHotel();
      this.show = false;
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
          }
        );
    });
  }

  public getNumRoom(type): any {
    const q = this.quartos.filter(quarto => quarto.tipoQuarto === type);
    return q.length;
  }

  public getRoom(type): Quarto {
    const q = this.quartos.filter(quarto => quarto.tipoQuarto === type);
    return q[0];
  }

  public getTipoCerto(tipo): any {
    return tipo.split(/(?=[A-Z])/).join(' ');
  }

  public verServicos(): void {
    this.show = !this.show;
  }
}
