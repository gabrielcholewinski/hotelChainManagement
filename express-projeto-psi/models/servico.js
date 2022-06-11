var mongoose = require('mongoose');
var moment = require('moment');

var Schema = mongoose.Schema;

var ServicoSchema = new Schema({
    nome: {type: String, required: true},
});

// Virtual for this bookinstance object's URL.
ServicoSchema
.virtual('url')
.get(function () {
  return '/catalog/servicos/'+this._id;
});

// Export model.
module.exports = mongoose.model('Servico', ServicoSchema);
