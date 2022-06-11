var Quarto = require('../models/quarto')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.get_quarto = function(req, res, next) {
  Quarto.findById(req.params.id)
      .exec(function (err, quarto) {
          if (err) { return next(err); }
          // Successful, so render.
          res.json({quarto: quarto});
      })
}
