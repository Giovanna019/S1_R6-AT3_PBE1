const express3 = require('express')
const entregasRouter = express3.Router()
const { entregaController } = require('../controllers/entregaController')


entregasRouter.get('/', entregaController.buscarTodasEntregas)
entregasRouter.get('/id', entregaController.buscarEntregaPorId)
entregasRouter.post('/', entregaController.incluirEntrega)
entregasRouter.put('/:idEntrega', entregaController.editarEntrega)
entregasRouter.delete('/:idEntrega', entregaController.excluirEntrega)


module.exports = entregasRouter