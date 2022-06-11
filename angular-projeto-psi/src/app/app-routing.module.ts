import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {HotelListComponent} from './hotel-list/hotel-list.component';
import {HotelDetailComponent} from './hotel-detail/hotel-detail.component';
import {ReservaComponent} from './reserva/reserva.component';
import {RegistarComponent} from './registar/registar.component';
import {LoginComponent} from './login/login.component';
import {UserDetailsComponent} from './user-details/user-details.component';

const routes: Routes = [
  { path: '', component: HotelListComponent },
  { path: 'registar', component: RegistarComponent },
  { path: 'login', component: LoginComponent },
  { path: 'conta', component: UserDetailsComponent },
  { path: ':hotelID', component: HotelDetailComponent },
  { path: ':hotelID/:reserva', component: ReservaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
