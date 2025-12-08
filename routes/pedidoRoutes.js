const express = require('express');
const pedidoRoutes = express.Router();
const  pedidoController  = require('./controllers/pedidoController');

pedidoRoutes.get('/pedidos', pedidoController.selecionaTodosPedidos);
pedidoRoutes.post('/pedidos', pedidoController.criaPedido);
pedidoRoutes.put('/pedidos/', pedidoController.atualizaPedido);
pedidoRoutes.delete('/pedidos/:id', pedidoController.deletarPedido);

module.exports = { pedidoRoutes };