var Cliente = require('../models/cliente')

const { body, validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

exports.getClientes

exports.getClientes = function (req, res, next) {
    Cliente.find()
        .sort([['name', 'ascending']])
        .exec(function (err, list_clientes) {
            if (err) { return next(err); }
            res.json({ cliente_list: list_clientes });
        })
}

exports.getCliente = function (req, res, next) {
    Cliente.find({'email' : req.params.email})
        .exec(function (err, cliente) {
            if (err) { return next(err); }
            res.json(cliente);
        })
}

exports.cliente_create_get = function (req, res, next) {
    res.json();
};

exports.cliente_create_post = [
  body('nome').isLength({ min: 2 }).trim().escape(),
  body('password').isLength({ min: 2 }).trim().escape(),
  //body('email').isEmail().trim().normalizeEmail(),
  body('email').isLength({min: 6}).trim().escape(),
  body('morada').isLength({ min: 2 }).trim().escape(),
  body('numero_telefone').isLength({ min: 13}).isLength({ max: 14 }).trim(),
  body('nif').isLength({ min: 9}).isLength({ max: 9}).isNumeric().trim(),
  //sanitize
  sanitizeBody('nome').escape(),
  sanitizeBody('password').escape(),
  sanitizeBody('email').escape(),
  sanitizeBody('morada').escape(),
  sanitizeBody('numero_telefone').escape(),
  sanitizeBody('nif').escape(),
  // Process request after validation and sanitization.
  (req, res, next) => {

      // Extract the validation errors from a request.
      const errors = validationResult(req);

      // Create cliente object with escaped and trimmed data
      var cliente = new Cliente(
          {
              nome: req.body.nome,
              password: req.body.password,
              email: req.body.email,
              morada: req.body.morada,
              numero_telefone: req.body.numero_telefone,
              nif: req.body.nif,
          }
      );

      if (!errors.isEmpty()) {
          // There are errors. Render form again with sanitized values/errors messages.
          res.json({cliente: cliente, errors: errors.array() });
          console.log("Erros: %j", errors.array());
          return;
      }
      else {
          // Save cliente.
          cliente.save(function (err) {
              if (err) { return next(err); }
              // Successful - redirect to new Reserva record.
              res.redirect(cliente.url);
          });
      }
  }
];

exports.cliente_update_get = function (req, res, next) {

    Cliente.find(req.params.nome, function (err, cliente) {
        if (err) { return next(err); }
        if (cliente == null) { // No results.
            var err = new Error('Cliente not found');
            err.status = 404;
            return next(err);
        }
        // Success.
        res.json({cliente: cliente });

    });
};

exports.cliente_update_post = [

    body('nome').isLength({ min: 2 }).trim().escape(),
    body('password').isLength({ min: 2 }).trim().escape(),
    body('email').isEmail().trim().normalizeEmail(),
    body('morada').isLength({ min: 2 }).trim().escape(),
    body('numero_telefone').isLength({ min: 13}).isLength({ max: 14 }).trim(),
    body('nif').isLength({ min: 9}).isLength({ max: 9}).isNumeric().trim(),
    //sanitize
    sanitizeBody('nome').escape(),
    sanitizeBody('password').escape(),
    sanitizeBody('email').escape(),
    sanitizeBody('morada').escape(),
    sanitizeBody('numero_telefone').escape(),
    sanitizeBody('nif').escape(),
    // Process request after validation and sanitization.
    (req, res, next) => {
  
        // Extract the validation errors from a request.
        const errors = validationResult(req);
  
        // Create cliente object with escaped and trimmed data
        var cliente = new Cliente(
            {
                nome: req.body.nome,
                password: req.body.password,
                email: req.body.email,
                morada: req.body.morada,
                numero_telefone: req.body.numero_telefone,
                nif: req.body.nif,
            }
        );
  
        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.json({cliente: cliente, errors: errors.array() });
            console.log("Erros: %j", errors.array());
            return;
        }
        else {
            // Data from form is valid. Update the record.
            Cliente.findAndUpdate(req.params.nome, cliente, {}, function (err, cliente) {
                if (err) { return next(err); }

                res.redirect(cliente.url);
            });
        }
    }
];
