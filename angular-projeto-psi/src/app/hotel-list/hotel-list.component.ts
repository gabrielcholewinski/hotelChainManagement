import { Component, OnInit } from '@angular/core';

import { Hotel } from '../interfaces/Hotel';
import { HotelService } from '../hotel.service';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css']
})
export class HotelListComponent implements OnInit {

  constructor(private hotelService: HotelService) { }

  hotelList: Hotel[];
  message: string;

  private static randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit(): void {
    this.getHotels();
  }

  private getHotels() {
    this.hotelService.getHotels().subscribe(response => this.hotelList = response.hotel_list);
  }

  public imgAleatoria(hotel) {
    return hotel.imagens[HotelListComponent.randomInt(0, hotel.imagens.length - 1)];
  }

  public primeiraFrase(descricao: string): string {
    return descricao.split('.')[0] + '.';
  }

}
