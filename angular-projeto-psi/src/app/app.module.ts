import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessagesComponent } from './messages/messages.component';
import { HotelDetailComponent } from './hotel-detail/hotel-detail.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';
import { RoomTypeDetailsComponent } from './room-type-details/room-type-details.component';

import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import { ReservaComponent } from './reserva/reserva.component';
import { RoomsByDateComponent } from './rooms-by-date/rooms-by-date.component';
import { RegistarComponent } from './registar/registar.component';
import { LoginComponent } from './login/login.component';
import { ClienteService } from './cliente.service';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ReservaDetailComponent } from './reserva-detail/reserva-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    MessagesComponent,
    HotelDetailComponent,
    HotelListComponent,
    RoomTypeDetailsComponent,
    ReservaComponent,
    RoomsByDateComponent,
    RegistarComponent,
    LoginComponent,
    UserDetailsComponent,
    ReservaDetailComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
