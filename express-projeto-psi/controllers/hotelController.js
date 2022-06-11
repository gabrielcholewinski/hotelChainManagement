var Hotel = require('../models/hotel')
var async = require('async')
var Quarto = require('../models/quarto')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.get_hotels = function (req, res, next) {
    Hotel.find()
        .sort([['nome', 'ascending']])
        .exec(function (err, list_hotels) {
            if (err) { return next(err); }
            // Successful, so render.
            res.json({ hotel_list: list_hotels });
        })
}

exports.get_hotel = function (req, res, next) {
    async.parallel({
        hotel: function (callback) {
            Hotel.findById(req.params.id)
                .exec(callback)
        },
        hotel_rooms: function (callback) {
            Quarto.find({ 'hotel': req.params.id }, 'hotel tipoQuarto precoBaixo precoAlto servicos')
                .exec(callback)
        },
    }, function (err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.hotel == null) { // No results.
            var err = new Error('Hotel not found');
            err.status = 404;
            return next(err);
        }

        res.json({ hotel: results.hotel, hotel_rooms: results.hotel_rooms });
    });

};

/*
exports.hotel_create_get = function (req, res, next) {
    res.json();
};

exports.hotel_create_post = [

  // Validate fields.
  body('id').isLength({ min: 1 }).trim().withMessage('Hotel id must be specified.'),
  body('name').isLength({ min: 1 }).trim().withMessage('Hotel name must be specified.'),
  body('description').isLength({ min: 1 }).trim().withMessage('Hotel description must be specified.'),
  body('address').isLength({ min: 1 }).trim().withMessage('Hotel address must be specified.'),
  body('coordinates').isLength({ min: 1 }).trim().withMessage('Hotel coordinates must be specified.'),
  body('phone_number').isLength({ min: 1 }).trim().withMessage('Hotel phone_number must be specified.'),
  body('email').isLength({ min: 1 }).trim().withMessage('Hotel email must be specified.'),

  // Sanitize fields.
  sanitizeBody('id').escape(),
  sanitizeBody('name').escape(),
  sanitizeBody('description').escape(),
  sanitizeBody('address').escape(),
  sanitizeBody('coordinates').escape(),
  sanitizeBody('phone_number').escape(),
  sanitizeBody('email').escape(),
  sanitizeBody('images').escape(),

  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create Hotel object with escaped and trimmed data
      var hotel = new Hotel(
          {
              id: req.body.id,
              name: req.body.name,
              description: req.body.description,
              address: req.body.address,
              coordinates: req.body.coordinates,
              phone_number: req.body.phone_number,
              email: req.body.email,
              images: req.body.images,
          }
      );

      if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/errors messages.
          res.json({hotel: hotel, errors: errors.array() });
          return;
      }
      else {
          // Save hotel.
          hotel.save(function (err) {
              if (err) { return next(err); }
              // Successful - redirect to new hotel record.
              res.redirect(hotel.url);
          });
      }
  }
];
*/