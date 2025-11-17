const express = require('express')
const clientesRouter = express.Router()
const { clienteController } = require('../controllers/clienteController')


clientesRouter.get('/', clienteController.buscarTodosClientes)
clientesRouter.get('/id', clienteController.buscarClientePorId)
clientesRouter.post('/', clienteController.incluirCliente)
clientesRouter.put('/:idCliente', clienteController.editarCliente)
clientesRouter.delete('/:idCliente', clienteController.excluirCliente)


module.exports = clientesRouter