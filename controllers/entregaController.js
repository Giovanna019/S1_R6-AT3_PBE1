const { entregaModel } = require('../models/entregaModel')
const { pedidoModel } = require('../models/pedidoModel')

const entregaController = {

  // buscar todas as entregas
  buscarTodasEntregas: async (req, res) => {
    try {
      const [dados] = await entregaModel.selecionarTodas()

      if (dados.length === 0) {
        return res.status(200).json({ message: 'nenhuma entrega cadastrada' })
      }

      res.status(200).json({ message: 'entregas encontradas', data: dados })
    } catch (error) {
      res.status(500).json({ message: 'erro no servidor', error: error.message })
    }
  },

  // buscar entrega por ID
  buscarEntregaPorId: async (req, res) => {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ message: 'informe o id da entrega' })
      }

      const [entrega] = await entregaModel.selecionarPorId(id)

      if (entrega.length === 0) {
        return res.status(404).json({ message: 'entrega não encontrada' })
      }

      res.status(200).json({ message: 'entrega encontrada', data: entrega[0] })
    } catch (error) {
      res.status(500).json({ message: 'erro no servidor', error: error.message })
    }
  },

  // criar entrega (com cálculo automático)
  incluirEntrega: async (req, res) => {
    try {
      const { idPedido } = req.body

      if (!idPedido) {
        return res.status(400).json({ message: 'informe o id do pedido' })
      }

      // pegar dados do pedido
      const [ped] = await pedidoModel.selecionarPorId(idPedido)

      if (ped.length === 0) {
        return res.status(404).json({ message: 'pedido não existe' })
      }

      const pedido = ped[0]

      // cálculos
      const valorDistancia = pedido.distancia * pedido.valorKm
      const valorPeso = pedido.peso * pedido.valorKg
      let valorBase = valorDistancia + valorPeso
      let acrescimo = 0
      let desconto = 0
      let taxaExtra = 0

      if (pedido.tipoEntrega === 'urgente') {
        acrescimo = valorBase * 0.20
      }

      let valorFinal = valorBase + acrescimo

      if (valorFinal > 500) {
        desconto = valorFinal * 0.10
        valorFinal -= desconto
      }

      if (pedido.peso > 50) {
        taxaExtra = 15
        valorFinal += taxaExtra
      }

      const dadosEntrega = {
        idPedido,
        valorDistancia,
        valorPeso,
        acrescimo,
        desconto,
        taxaExtra,
        valorFinal,
        statusEntrega: 'calculado'
      }

      const [resultado] = await entregaModel.inserirEntrega(dadosEntrega)

      if (resultado.affectedRows === 1) {
        res.status(201).json({
          message: 'entrega registrada com sucesso',
          idEntrega: resultado.insertId,
          dadosEntrega
        })
      } else {
        res.status(400).json({ message: 'erro ao registrar entrega' })
      }

    } catch (error) {
      res.status(500).json({ message: 'erro no servidor', error: error.message })
    }
  },

  // atualizar status ou valores
  editarEntrega: async (req, res) => {
    try {
      const { idEntrega } = req.params
      const dados = req.body

      const [resultado] = await entregaModel.atualizarEntrega(idEntrega, dados)

      if (resultado.affectedRows === 1) {
        res.status(200).json({ message: 'entrega atualizada com sucesso' })
      } else {
        res.status(404).json({ message: 'entrega não encontrada' })
      }
    } catch (error) {
      res.status(500).json({ message: 'erro no servidor', error: error.message })
    }
  },

  // excluir entrega
  excluirEntrega: async (req, res) => {
    try {
      const { idEntrega } = req.params

      const [resultado] = await entregaModel.deletarEntrega(idEntrega)

      if (resultado.affectedRows === 1) {
        res.status(200).json({ message: 'entrega excluída com sucesso' })
      } else {
        res.status(404).json({ message: 'entrega não encontrada' })
      }

    } catch (error) {
      res.status(500).json({ message: 'erro no servidor', error: error.message })
    }
  }
}

module.exports = { entregaController }
