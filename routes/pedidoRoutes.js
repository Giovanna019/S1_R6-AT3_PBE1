const express2 = require('express')
const pedidosRouter = express2.Router()
const { pedidoController } = require('../controllers/pedidoController')


pedidosRouter.get('/', pedidoController.listarPedidos)
pedidosRouter.post('/', pedidoController.criarPedido)

module.exports = pedidosRouter