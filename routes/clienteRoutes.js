const express = require('express');
const clienteRoutes = express.Router();

// Rota do controller
const {clienteController} = require('../controllers/clienteController')

// Rotas do cliente 
clienteRoutes.get('/', clienteController.selecionaTodosClientes);     
clienteRoutes.post('/', clienteController.criarCliente);               
clienteRoutes.put('/:id', clienteController.atualizaCliente);           
clienteRoutes.delete('/:id', clienteController.deleteCliente);         

// Rota do telefone
clienteRoutes.put('/telefone/:id', clienteController.atualizaTelefone);  

module.exports = {clienteRoutes};
