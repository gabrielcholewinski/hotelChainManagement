import {Component, OnInit} from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Cliente} from '../interfaces/Cliente';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  clienteList: Cliente[];
  myStorage = window.localStorage;

  constructor(private route: ActivatedRoute, private clienteService: ClienteService,
              private location: Location) { }

  ngOnInit(): void {
    this.getClientes();
  }

  loginCliente(email: string, password: string) {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.clienteList.length; i++) {
      console.log(this.clienteList[i]);
      if (this.clienteList[i].email === email && password === this.clienteList[i].password) {
        console.log('Entrou no if');
        this.myStorage.setItem('nome',  this.clienteList[i].nome);
        this.myStorage.setItem('morada',  this.clienteList[i].morada);
        this.myStorage.setItem('numero_telefone',  this.clienteList[i].numero_telefone);
        this.myStorage.setItem('email',  this.clienteList[i].email);
        this.myStorage.setItem('nif', String(this.clienteList[i].nif));

        window.location.replace('/');
        return;
      }else if(this.clienteList[i].email == email && password != this.clienteList[i].password){
        window.alert("Password incorreta!");
        return;
      }
    }
    window.alert('Email/Password incorretos!');
    return;
  }



  goBack(): void {
    this.location.back();
  }

  private getClientes() {
    this.clienteService.getClientes().subscribe(response => this.clienteList = response.cliente_list);
  }

}
