const express = require('express');
const clienteRoutes = express.Router();
const  clienteController  = require('../controllers/clienteController');

clienteRoutes.get('/clientes', clienteController.selecionaTodosClientes);
clienteRoutes.post('/clientes', clienteController.criarCliente);
clienteRoutes.put('/clientes/atualizatelefone', clienteController.atualizaTelefone)
clienteRoutes.put('/clientes/atualizacliente/:id', clienteController.atualizaCliente)
clienteRoutes.delete('/clientes/deletarcliente/:id', clienteController.DeleteCliente)

module.exports = { clienteRoutes };