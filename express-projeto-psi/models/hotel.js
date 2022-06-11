var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var HotelSchema = new Schema(
  {
    nome: {type: String, required: true, max: 20},
    descricao: {type: String, required: true},
    morada: {type: String, required: true, max: 100},
    coordenadas: {type: String, required: true, max: 100},
    numero_telefone: {type: String, required: true, max: 15},
    email: {type: String, required: true, max: 20},
    imagens: [{type: String}],
    servicos: [{type: String}]
  }
);

// Virtual for hotel's URL
HotelSchema
.virtual('url')
.get(function () {
  return '/catalog/hotel/' + this._id;
});

//Export model
module.exports = mongoose.model('Hotel', HotelSchema);
