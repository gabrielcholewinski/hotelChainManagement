var Reserva = require('../models/reserva')
var async = require('async')
var Quarto = require('../models/quarto')

//const { check, validationResult } = require('express-validator');
const { body, validationResult } = require('express-validator/check');

const { sanitizeBody } = require('express-validator/filter');

exports.getReserva = function (req, res, next) {
    Reserva.find({ 'quarto': req.params.quarto })
        .exec(function (err, reserva) {
            if (err) { return next(err); }
            res.json({ reserva: reserva });
        })
}

exports.getReservas = function (req, res, next) {
    Reserva.find()
        //.sort([['nif', 'ascending']])
        .exec(function (err, list_reservas) {
            if (err) { return next(err); }
            res.json({ reservas_list: list_reservas });
        })
}

exports.reserva_create_post = [
    body('checkin').isISO8601().toDate(),
    body('checkout').isISO8601().toDate(),
    body('nome').isLength({ min: 2 }).escape(),
    body('morada').isLength({ min: 2 }).escape(),
    body('numero_telefone').isLength({ min: 13}).isLength({ max: 14 }).trim(),
    //body('email').isEmail().trim().normalizeEmail(),
    body('email').isLength({min: 6}),
    body('numeroCartao').isLength({min:16}).isLength({max:16}).trim(),
    body('ccv').isLength({ min: 3}).isLength({ max: 3}).isNumeric().trim(),
    body('anoValidade').isLength({ min: 2 }).isLength({ max: 4 }).isNumeric().trim(),
    body('mesValidade').isLength({ min: 1 }).isLength({ max: 2 }).isNumeric().trim(),
    body('nif').isLength({ min: 9}).isLength({ max: 9}).isNumeric().trim(),
    body('preco').isNumeric().trim(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);

        // Create Reserva object with escaped and trimmed data
        var reserva = new Reserva(
            {
                quarto: req.body.quarto,
                checkin: req.body.checkin,
                checkout: req.body.checkout,
                nome: req.body.nome,
                morada: req.body.morada,
                numero_telefone: req.body.numero_telefone,
                email: req.body.email,
                nif: req.body.nif,
                numeroCartao: req.body.numeroCartao,
                ccv: req.body.ccv,
                anoValidade: req.body.anoValidade,
                mesValidade: req.body.mesValidade,
                preco: req.body.preco
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            //console.log("Reserva: %j", reserva);
            console.log("Erros: %j", errors.array());
            res.json({ reserva: reserva, errors: errors.array() });
            return;
        }
        else {
            // Save Reserva.
            reserva.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new Reserva record.
                res.redirect(reserva.url);
            });
        }
    }
];
