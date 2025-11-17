const { pedidoModel } = require('../models/pedidoModel')

const pedidoController = {

  // buscar todos os pedidos
  buscarTodosPedidos: async (req, res) => {
    try {
      const [dados] = await pedidoModel.selecionarTodos()

      if (dados.length === 0) {
        return res.status(200).json({ message: 'nenhum pedido cadastrado' })
      }

      res.status(200).json({ message: 'pedidos encontrados', data: dados })
    } catch (error) {
      res.status(500).json({ message: 'erro no servidor', error: error.message })
    }
  },

  // buscar pedido por ID
  buscarPedidoPorId: async (req, res) => {
    try {
      const { id } = req.query

      if (!id) {
        return res.status(400).json({ message: 'informe o id do pedido' })
      }

      const [pedido] = await pedidoModel.selecionarPorId(id)

      if (pedido.length === 0) {
        return res.status(404).json({ message: 'pedido não encontrado' })
      }

      res.status(200).json({ message: 'pedido encontrado', data: pedido[0] })
    } catch (error) {
      res.status(500).json({ message: 'erro no servidor', error: error.message })
    }
  },

  // criar pedido
  incluirPedido: async (req, res) => {
    try {
      const { idCliente, dataPedido, tipoEntrega, distancia, peso, valorKm, valorKg } = req.body

      if (!idCliente || !dataPedido || !tipoEntrega || !distancia || !peso || !valorKm || !valorKg) {
        return res.status(400).json({ message: 'preencha todos os dados obrigatórios' })
      }

      const [resultado] = await pedidoModel.inserirPedido(req.body)

      if (resultado.affectedRows === 1) {
        res.status(201).json({
          message: 'pedido criado com sucesso',
          idPedido: resultado.insertId
        })
      } else {
        res.status(400).json({ message: 'erro ao criar pedido' })
      }

    } catch (error) {
      res.status(500).json({ message: 'erro no servidor', error: error.message })
    }
  },

  // atualizar pedido
  editarPedido: async (req, res) => {
    try {
      const { idPedido } = req.params
      const dados = req.body

      if (!idPedido) {
        return res.status(400).json({ message: 'informe o id do pedido' })
      }

      const [resultado] = await pedidoModel.atualizarPedido(idPedido, dados)

      if (resultado.affectedRows === 1) {
        res.status(200).json({ message: 'pedido atualizado com sucesso' })
      } else {
        res.status(404).json({ message: 'pedido não encontrado' })
      }
    } catch (error) {
      res.status(500).json({ message: 'erro no servidor', error: error.message })
    }
  },

  // excluir pedido
  excluirPedido: async (req, res) => {
    try {
      const { idPedido } = req.params

      if (!idPedido) {
        return res.status(400).json({ message: 'informe o id do pedido' })
      }

      const [resultado] = await pedidoModel.deletarPedido(idPedido)

      if (resultado.affectedRows === 1) {
        res.status(200).json({ message: 'pedido excluído com sucesso' })
      } else {
        res.status(404).json({ message: 'pedido não encontrado' })
      }
    } catch (error) {
      res.status(500).json({ message: 'erro no servidor', error: error.message })
    }
  }
}

module.exports = { pedidoController }
