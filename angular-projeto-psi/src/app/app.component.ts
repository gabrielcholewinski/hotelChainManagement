import { Component, OnInit } from '@angular/core';
import { Hotel } from './interfaces/Hotel';
import { HotelService } from './hotel.service';
import { Cliente } from './interfaces/Cliente';
import { ClienteService } from './cliente.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  constructor(private hotelService: HotelService, private clienteService: ClienteService, private location: Location) { }
  title = 'angular-projeto-psi';
  hotelList: Hotel[];
  myStorage = window.localStorage;
  emailCliente = '';
  show = false;

  ngOnInit(): void {
    this.getHotels();
  }

  private getHotels() {
    console.log('Entrou no getHotels do app');
    this.hotelService.getHotels().subscribe(response => {
      this.hotelList = response.hotel_list;
      this.emailCliente = (this.myStorage.getItem('email') === undefined || this.myStorage.getItem('email') === null) ?
        '' :  this.myStorage.getItem('email');
    });
  }

  logOut() {
    this.myStorage.clear();
    this.emailCliente = '';
  }

}
