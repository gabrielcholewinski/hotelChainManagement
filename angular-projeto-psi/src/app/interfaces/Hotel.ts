
export interface Hotel {
  // podem faltar certos atributos do JSON mas acho que vao ser estes todos
  _id: string;
  nome: string;
  descricao: string;
  morada: string;
  coordenadas: string;
  numero_telefone: string;
  email: string;

  // vai ser algo assim
  // https://stackoverflow.com/questions/54492562/angular-getting-property-from-json-object-and-displaying-it-as-image
  imagens: string[];
  servicos: string[];
}
