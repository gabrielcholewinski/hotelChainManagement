import { Component, OnInit , Input} from '@angular/core';

import {Hotel} from '../interfaces/Hotel';
import {HotelService} from '../hotel.service';
import {Quarto} from '../interfaces/Quarto';
import {QuartoService} from '../quarto.service';
import {Reserva} from '../interfaces/Reserva';


@Component({
  selector: 'app-reserva-detail',
  templateUrl: './reserva-detail.component.html',
  styleUrls: ['./reserva-detail.component.css']
})
export class ReservaDetailComponent implements OnInit {

  @Input() idQuarto: string;
  @Input() dataI: Date;
  @Input() dataF: Date;
  @Input() preco: Number;
  hotelId: string;
  hotel: Hotel;
  quarto: Quarto;
  quartos: Quarto[];


  constructor(private hotelService: HotelService,
              private quartoService: QuartoService) { }

  ngOnInit(): void {
    this.getRoom();
    //this.hotelId=this.quarto.hotel.toString();
    //this.getHotel();
  }

  getRoom() {
    this.quartoService.getQuarto(this.idQuarto).subscribe(response => {
      this.quarto = response.quarto;
      this.hotelService.getHotel(this.quarto.hotel.toString()).subscribe((response) => ((this.hotel = response.hotel),
        (this.quartos = response.hotel_rooms)));
    });
    //return this.quarto;
  }

  public getHotel(): void {
    console.log(this.quarto.hotel.toString());
    this.hotelService.getHotel(this.quarto.hotel.toString()).subscribe((response) => ((this.hotel = response.hotel),
      (this.quartos = response.hotel_rooms)));
  }

}
