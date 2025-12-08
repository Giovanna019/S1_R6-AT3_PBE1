const express = require('express');
const clienteRoutes = express.Router();

// Caminho CORRETO para o controller
const {clienteController} = require('../controllers/clienteController');

// ROTAS DE CLIENTE
clienteRoutes.get('/', clienteController.selecionaTodosClientes);        // GET /clientes
clienteRoutes.post('/', clienteController.criarCliente);                 // POST /clientes
clienteRoutes.put('/:id', clienteController.atualizaCliente);            // PUT /clientes
clienteRoutes.delete('/:id', clienteController.deleteCliente);           // DELETE /clientes

// ROTAS DE TELEFONE
clienteRoutes.put('/telefone/:id', clienteController.atualizaTelefone);  // PUT /clientes/telefone/5

module.exports = {clienteRoutes};
