const express3 = require('express')
const entregasRouter = express3.Router()
const { entregaController } = require('../controllers/entregaController')


entregasRouter.get('/', entregaController.listarEntregas)
entregasRouter.post('/', entregaController.calcularEntrega)


module.exports = entregasRouter