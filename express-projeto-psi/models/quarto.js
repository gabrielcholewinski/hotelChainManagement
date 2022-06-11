var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var QuartoSchema = new Schema(
  {
    hotel: { type: Schema.Types.ObjectId, ref: 'Hotel', required: true }, //reference to the associated hotel
    tipoQuarto: {type: String, required: true, enum: ['Standard', 'Suite', 'SuiteDuplex', 'SuiteDeluxe', 'SuiteJunior', 'SuiteJuniorSuperior', 'SuiteSenior'], default: 'Standard'},
    precoBaixo: {type: Number, required: true},
    precoAlto: {type: Number, required: true},
    servicos: [{type: String}]
  }
);

// Virtual for quarto's URL
QuartoSchema
.virtual('url')
.get(function () {
  return '/catalog/quarto/' + this._id;
});

//Export model
module.exports = mongoose.model('Quarto', QuartoSchema);
