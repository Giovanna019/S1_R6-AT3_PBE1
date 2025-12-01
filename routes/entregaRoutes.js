const express = require('express');
const entregaRoutes = express.Router();
const { entregaController } = require('../controllers/entregaController');

entregaRoutes.get('/entregas', entregaController.mostraTodasEntregas);
entregaRoutes.post('/entregas', entregaController.criaNovaEntrega);
entregaRoutes.put('/entregas', entregaController.atualizaEntrega);
entregaRoutes.delete('/entregas/:id', entregaController.deletaEntrga);

module.exports = { entregaRoutes };