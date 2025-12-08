const express = require('express');
const router = express.Router();
const clienteController = require('./controllers/clienteController');

// ROTAS DE CLIENTE
router.get('/', clienteController.selecionaTodosClientes);      // GET /clientes
router.post('/', clienteController.criarCliente);               // POST /clientes
router.put('/:id', clienteController.atualizaCliente);          // PUT /clientes/1
router.delete('/:id', clienteController.deleteCliente);         // DELETE /clientes/1

// ROTAS DE TELEFONE
router.put('/telefone/:id', clienteController.atualizaTelefone); // PUT /clientes/telefone/5

module.exports = router;
