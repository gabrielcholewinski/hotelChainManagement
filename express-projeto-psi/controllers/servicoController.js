var Servico = require('../models/genre');

var async = require('async');
const validator = require('express-validator');

// Display list of all Genre.
exports.servico_list = function(req, res) {
    
    Genre.find()
      .populate('servico')
      .sort([['nome', 'ascending']])
      .exec(function (err, list_servicos) {
        if (err) { return next(err); }
        //Sucessfull, so render
        res.json('servico_list', { title: 'Lista Servicos', servico_list: list_servicos  });
      });
};

// Display detail page for a specific Author.
exports.servico_detail = function(req, res, next) {

    async.parallel({
        servico: function(callback) {
            Servico.findById(req.params.id)
              .exec(callback)
        },
    }, function(err, results) {
        if (err) { return next(err); } // Error in API usage.
        if (results.servico==null) { // No results.
            var err = new Error('Servico not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.json('servico_detail', { title: 'Servico Detail', servico: results.servico} );
    });

    // Handle Servico create on POST.
exports.servico_create_post = [

    // Validate fields.
    body('nome').isLength({ min: 1 }).trim().withMessage('Nome tem que ser especificado.')
        .isAlphanumeric().withMessage('Nome tem caracteres não alfa-numéricos.'),
    
    // Sanitize fields.
    sanitizeBody('nome').escape(),

    // Process request after validation and sanitization.
    (req, res, next) => {

        // Extract the validation errors from a request.
        const errors = validationResult(req);
        
        // Create Author object with escaped and trimmed data
        var servico = new Servico(
            {
                nome: req.body.nome,
            }
        );

        if (!errors.isEmpty()) {
            // There are errors. Render form again with sanitized values/errors messages.
            res.json({ title: 'Criar servico', servico: servico, errors: errors.array() });
            return;
        }
        else {
            // Data from form is valid.

            // Save author.
            servico.save(function (err) {
                if (err) { return next(err); }
                // Successful - redirect to new author record.
                res.redirect(servico.url);
            });
        }
    }
];
};