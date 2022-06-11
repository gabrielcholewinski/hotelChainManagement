import {Component, Input, OnInit} from '@angular/core';

import { Hotel } from '../interfaces/Hotel';
import {HotelService} from '../hotel.service';
import { Quarto } from '../interfaces/Quarto';
import {QuartoService} from '../quarto.service';
import { TipoQuarto } from '../interfaces/TipoQuarto';
import { Reserva } from '../interfaces/Reserva';
import {ReservaService} from '../reserva.service';
import { Cliente } from '../interfaces/Cliente';

import { DataService } from '../data.service';

import {Location} from '@angular/common';

import {ActivatedRoute} from '@angular/router';


@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  @Input() cliente: Cliente;
  nome: string;
  morada: string;
  telefone: string;
  email: string;
  nif: string;
  numeroCartao: string;
  ano: string;
  mes: string;
  ccv: string;
  @Input() tipo: string;
  botaoR: boolean;
  confR: boolean;
  inputReserva: boolean;
  confirmacao: boolean;

  hotel: Hotel;
  quartos: Quarto[];
  id: string;
  reservas: Reserva[];


  @Input() dataInicial: Date;
  @Input() dataFinal: Date;

  constructor(private route: ActivatedRoute,
              private data: DataService,
              private hotelService: HotelService,
              private quartoService: QuartoService,
              private reservaService: ReservaService,
              private location: Location) { }

 myStorage = window.localStorage;

  ngOnInit(): void {
    this.botaoR = true;
    this.confR = false;
    this.inputReserva = true;
    this.confirmacao = false;
    this.getHotel();
    this.getReservasDoHotel();
  }

  public addReserva(): void {

    this.reservaService.addReserva({quarto: this.getRoom(this.tipo), checkin: this.dataInicial,
      checkout: this.dataFinal, nome: this.nome, email: this.email, morada: this.morada,
      numero_telefone: this.telefone.replace(/\s/g, ''), nif: Number(this.nif), numeroCartao: Number(this.numeroCartao),
      ccv: Number(this.ccv), anoValidade: Number(this.ano), mesValidade: Number(this.mes), preco: this.calculaPreco() }).subscribe(
        () => window.location.reload());
  }


  mostraConf(nome: string, morada: string, telefone: string, email: string, nif: string, numeroCartao: string,
             ano: string, mes: string, ccv: string): void {

    if (!nome || !morada || !telefone || !email || !nif || !numeroCartao ||
      !ano || !mes || !ccv ) {
      window.alert('Existem dados por preencher!');
      return;
    }

    if (morada.length < 3) {
      window.alert('Insira uma morada válida!');
      return;
    }

    if (!this.validateName(nome)) {
      window.alert('Tem que inserir um nome válido');
      return;
    }

    if (!this.validateEmail(email)) {
      window.alert('Tem que inserir um email válido');
      return;
    }

    if (!this.validatePhoneNumber(telefone)) {
      window.alert('Tem que inserir um número de telefone no formato correto. Exemplo: +351 912345678!');
      return;
    }

    if (!this.validateNif(Number(nif))) {
      window.alert('Tem que inserir um nif no formato correto!');
      return;
    }

    if (!this.validateCreditCard(numeroCartao, ano, mes, ccv)) {
      return;
    }

    this.confR = true;
    this.botaoR = false;
    this.confirmacao = true;
    this.inputReserva = false;

    this.nome = nome;
    this.morada = morada;
    this.email = email;
    this.telefone = telefone;
    this.nif = nif;
    this.numeroCartao = numeroCartao;
    this.ano = ano;
    this.mes = mes;
    this.ccv = ccv;
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

  public getRoom(type): any {
    const q = this.quartos.filter(quarto => quarto.tipoQuarto === type);
    for (const quarto of q) {
      const r = this.reservas.filter(reserva => reserva.quarto === quarto);
      if (r.length === 0) {
        return quarto;
      } else {
        for (const reserva of r) {
          if (this.dataFinal < reserva.checkin
            && this.dataInicial > reserva.checkout) {
            return quarto;
          }
        }
      }
    }
  }

  private getReservasDoHotel(): void {
      this.reservaService.getReservas().subscribe(response => this.reservas = response.reservas_list);
    }


  public validateName(nome: string) {
    const regex = /^[a-za-zA-ZçÇ\u00C0-\u017F][a-za-zA-ZçÇ\s\u00C0-\u017F]*$/;
    return nome.match(regex) && nome.length > 2;
  }

  public validatePhoneNumber(telefone: string) {
    const regex = '^\\+(?:[0-9] ?){6,14}[0-9]$';
    return telefone.match(regex) && telefone[4].trim() === '';
  }

  public validateNif(nif: number) {
    const regex =  '^[0-9]{9}$';
    return nif.toString().match(regex);
  }

  public validateEmail(mail) {
    console.log('entrou no validate mail');
    const domain = mail.split('@')[1].substring(0, 5);
    let mailformat = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    if (domain === 'gmail') {
      console.log('Entrou no domain é gmail');
      mailformat = '^[a-z0-9.]+@[a-z0-9.-]+\.[a-z]{2,4}$';
    }
    return mail.match(mailformat);
  }

  public validateCreditCard(numero: string, anoValidade: string, mesValidade: string, ccv: string) {
    const regexNumero =  '^[0-9]{16}$';
    const regexAno =  '[2-9][0-9]$';
    const regexMes =  '0[1-9]|1[0-2]$';
    const regexCcv =  '^[0-9]{3}$';

    if(Number(anoValidade) < 20){
      window.alert('Ano inválido');
      return false;
    }

    if(anoValidade.match('20')){
      if(Number(mesValidade) <5){
        window.alert('Mes inválido');
        return false;
      }
    }

    if (!numero.match(regexNumero)){
      window.alert('Numero de cartão inváido. Tem de inserir 16 digitos.');
      return false;
    }
    if(!anoValidade.match(regexAno)){
      window.alert('Ano de validade inválido. Tem que inserir 2 digitos.');
      return false;
    }
    if(!mesValidade.match(regexMes)){
      window.alert('Mes de validade inválido. Tem que inserir 2 digitos. Ex: 05');
      return false;
    }
    if(!ccv.match(regexCcv) ) {
      window.alert('Ccv inválido. Tem que inserir 3 digitos.');
      return false;
    }
    return true;
  }



  private goBack(): void {
    this.location.back();
  }

  voltar() {
    this.botaoR = true;
    this.confirmacao = false;
    this.inputReserva = true;
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
