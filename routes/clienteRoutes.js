const express = require('express')
const clientesRouter = express.Router()
const { clienteController } = require('../controllers/clienteController')


clientesRouter.get('/', clienteController.listarClientes)

clientesRouter.get('/:id', clienteController.buscarClientePorId)

clientesRouter.post('/', clienteController.inserirCliente)

module.exports = clientesRouter

