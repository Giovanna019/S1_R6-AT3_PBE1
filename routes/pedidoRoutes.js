const express2 = require('express')
const pedidosRouter = express2.Router()
const { pedidoController } = require('../controllers/pedidoController')


pedidosRouter.get('/', pedidoController.buscarTodosPedidos)
pedidosRouter.get('/id', pedidoController.buscarPedidoPorId)
pedidosRouter.post('/', pedidoController.incluirPedido)
pedidosRouter.put('/:idPedido', pedidoController.editarPedido)
pedidosRouter.delete('/:idPedido', pedidoController.excluirPedido)


module.exports = pedidosRouter