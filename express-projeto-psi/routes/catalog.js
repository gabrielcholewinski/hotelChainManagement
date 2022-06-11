var express = require('express');
var router = express.Router();


var hotel_controller = require('../controllers/hotelController');
var quarto_controller = require('../controllers/quartoController');
var cliente_controller = require('../controllers/clienteController');
var reserva_controller = require('../controllers/reservaController');


/// HOTEL ROUTES ///
//nao ha homepage
/*
// GET catalog home page.
router.get('/', hotel_controller.index);
*/
//tambem nao precisamos destes
/*
// GET request for creating a Hotek.
router.get('/hotel/create', hotel_controller.hotel_create_get);

// POST request for creating Hotel.
router.post('/hotel/create', hotel_controller.hotel_create_post);
*/
// GET request for one Hotel.
router.get('/hotel/:id', hotel_controller.get_hotel);

// GET request for list of all Hotels.
router.get('/hoteis', hotel_controller.get_hotels);

/// QUARTO ROUTES ///
router.get('/quarto/:id', quarto_controller.get_quarto);

//Cliente
router.get('/clientes', cliente_controller.getClientes);

router.get('/cliente/:email', cliente_controller.getCliente);

router.post('/clientes/create', cliente_controller.cliente_create_post);

router.post('/cliente/:id/update', cliente_controller.cliente_update_post);

//Reserva
router.get('/reserva/:quarto', reserva_controller.getReserva);

router.get('/reservas', reserva_controller.getReservas);

router.post('/reservas/create', reserva_controller.reserva_create_post);




module.exports = router;
