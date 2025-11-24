const express = require('express')
const clientesRouter = express.Router()
const { clienteController } = require('../controllers/clienteController')


clientesRouter.get('/', clienteController.listarClientes)
clientesRouter.get('/id', clienteController.buscarPorId)
clientesRouter.post('/', clienteController.criarCliente)
module.exports = clientesRouter