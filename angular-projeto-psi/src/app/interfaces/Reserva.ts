import {Quarto} from './Quarto';

export interface Reserva {
  _id: string;
  quarto: Quarto;
  checkin: Date;
  checkout: Date;
  nome: string;
  morada: string;
  numero_telefone: string;
  email: string;
  nif: number;
  numeroCartao: number;
  ccv: number;
  anoValidade: number;
  mesValidade: number;
  preco: number;
}
