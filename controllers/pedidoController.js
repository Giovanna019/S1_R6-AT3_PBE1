const { pedidoModel } = require("../models/pedidoModel")
const pedidoController = {

    // cria um pedido novo
    criarPedido: async (req, res) => {
        try {
            const dados = req.body

            // conferindo os campos principais
            if(!dados.idCliente || !dados.tipoEntrega || !dados.distancia || !dados.peso){
                return res.status(400).json({ mensagem: "Dados incompletos." })
            }

            const resultado = await pedidoModel.criarPedido(dados)

            res.status(201).json({ mensagem: "Pedido registrado!", id: resultado.insertId })
        } catch (erro) {
            console.log("Erro ao criar pedido:", erro)
            res.status(500).json({ erro: "Erro interno no servidor." })
        }
    },

    // pega todos os pedidos feitos
    listarPedidos: async (req, res) => {
        try {
            const [lista] = await pedidoModel.listarPedidos()
            res.json(lista)
        } catch (erro) {
            console.log("Erro ao listar pedidos:", erro)
            res.status(500).json({ erro: "Erro interno no servidor." })
        }
    }
}

module.exports = { pedidoController }
